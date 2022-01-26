const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagood$boy";
const fetchUser = require("../middleware/fetchUser");

//  ROUTE 1 => Create a User using POST => "/api/auth/createuser" . Doesn't requier Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //  If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ succes: false, error: errors.array() });
    }

    //  Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.json({
          success: false,
          error: "Sorry a user with this email already exists",
        });
      }

      // Create a new User
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken: authToken });
    } catch (error) {
      console.log(error.message);
      res.json({ success: true, error: "Some Internal Error Occured" });
    }
  }
);

// ROUTE 2 => Authenticate a User using POST => "/api/auth/login" . Doesn't requier Login
router.post(
  "/login",
  [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password can not be blank").exists(),
  ],
  async (req, res) => {
    //  If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, error: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.json({ success: false, error: "Sorry wrong Credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.json({ success: false, error: "Sorry wrong Credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken1 = jwt.sign(data, JWT_SECRET);

      res.json({ success: true, authToken: authToken1 });
    } catch (error) {
      console.log(error.message);
      res.json({ success: false, error: "Some Internal Error Occured" });
    }
  }
);

// ROUTE 3 => Get loggedin user details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchUser, async (req, res) => {
  //  If there are errors, return Bad Request and the errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ success: false, error: errors.array() });
  }

  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.json({ success: true, user: user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, error: "Some Internal Error Occured" });
  }
});

module.exports = router;

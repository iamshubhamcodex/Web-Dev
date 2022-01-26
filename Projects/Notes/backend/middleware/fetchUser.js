const jwt = require("jsonwebtoken");
const JWT_SECRET = "Harryisagood$boy";

const fetchUser = (req, res, next) => {
  // Get the user from the jwt token and id to req object
  const token = req.header("auth-token");
  if (!token) {
    res.send({
      succes: false,
      error: "Please authenticate using a valid token",
    });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.send({
      succes: false,
      error: "Please authenticate using a valid token",
    });
  }
};

module.exports = fetchUser;

const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1 => Get all the notes using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2 => Add a Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Description must be atleast 10 characters").isLength({
      min: 10,
    }),
  ],
  async (req, res) => {
    const { title, description, tag } = req.body;

    //  If there are errors, return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Internal Error Occured");
    }
  }
);

// ROUTE 3 => Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Create a new note object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;

    // Find the note to be Updated
    // console.log(req.params.idd);
    let note = await Notes.findById(req.params.id);
    // let note = await Notes.findById(req.header("id"));
    if (!note) res.status(404).send("Not Found");
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    note = await Notes.findByIdAndUpdate(
      req.params.id,
      // req.header("id"),
      { $set: newNote },
      { new: true }
    );
    res.json({ note: note });
  } catch (error) {
    console.log({ err: error.message });
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4 => Deleting an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote:id", fetchUser, async (req, res) => {
  try {
    // Find the note to be Deleted and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) res.status(404).send("Not Found");

    // Allow deletion only if user is own
    if (note.user.toString() !== req.user.id)
      return res.status(401).send("Not Allowed");

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.log({ err: error.message });
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

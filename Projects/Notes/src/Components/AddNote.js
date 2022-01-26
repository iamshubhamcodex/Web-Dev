import React, { useState, useContext } from "react";
import noteContext from "../context/noteContext";

const AddNote = (props) => {
  const nContext = useContext(noteContext);
  const { showAlert, addNote } = nContext;

  const [note, setNote] = useState({ title: "", description: "" });

  const changInp = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const addN = (e) => {
    e.preventDefault();
    addNote(note);
    showAlert("Added Note", "success");
    setNote({ title: "", description: "" });
  };

  return (
    <>
      <div className={`addN ${props.hide}`}>
        <h1>Add a Note</h1>
        <form className="my-3 px-2">
          <div className="mb-3 ">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              name="title"
              onChange={changInp}
              className="form-control"
              id="title"
              minLength={3}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              name="description"
              onChange={changInp}
              rows="3"
              className="form-control"
              id="description"
              minLength={10}
              required
              value={note.description}
            />
          </div>
          <button
            disabled={note.title.length < 3 || note.description.length < 10}
            onClick={addN}
            type="submit"
            className="btn btn-primary"
          >
            Add Note
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;

import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/noteContext";
import AddNote from "./AddNote";
import NoNotes from "./NoNotes";
import NoteItem from "./NoteItem";

function Note() {
  const nContext = useContext(noteContext);
  const { notes, showAlert, fetchNote, updateNote } = nContext;
  let [hide, setHide] = useState(true);
  const [note, setNote] = useState({ title: "", description: "" });
  const ref = useRef(null);
  const refCls = useRef(null);

  useEffect(() => {
    fetchNote();
    // eslint-disable-next-line
  }, []);

  const upN = (e) => {
    refCls.current.click();
    updateNote(note);
    showAlert("Updated Note Successfully", "success");
  };
  function shoA() {
    setHide((hide = !hide));
  }
  const upNote = (currentnote) => {
    setNote(currentnote);
    ref.current.click();
  };
  const changInp = (e) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AddNote showAlert={showAlert} hide={hide ? "hide" : ""} />

      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      ></button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="text-center">Edit Note</h1>
            </div>
            <div className="modal-body">
              <form className="my-3">
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
                    aria-describedby="emailHelp"
                    value={note.title}
                    required
                    minLength={3}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    name="description"
                    onChange={changInp}
                    className="form-control"
                    id="description"
                    value={note.description}
                    required
                    minLength={10}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refCls}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={upN}
                disabled={note.title.length < 3 || note.description.length < 10}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <i
        onClick={shoA}
        className={`fa fa-${hide ? "plus-circle" : "close"}`}
      ></i>
      <h1>Your Notes</h1>
      <div className="row justify-content-center">
        {notes.length === 0 && <NoNotes />}
        {/* {notes.length !== 0 &&
          notes.map((note) => {
            return (
              <NoteItem
                showAlert={showAlert}
                key={note._id}
                upNote={upNote}
                note={note}
              />
            );
          })} */}
      </div>
    </>
  );
}

export default Note;

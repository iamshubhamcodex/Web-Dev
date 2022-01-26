import React, { useContext } from "react";
import noteContext from "../context/noteContext";

export default function NoteItem(props) {
  const nContext = useContext(noteContext);
  const { delNote } = nContext;

  const { note, upNote } = props;
  return (
    <>
      <div className="card m-3 pb-2" style={{ width: "15rem" }}>
        <div className="card-body">
          <h5 className="card-title text-center text-capitalize">
            {note.title}
          </h5>
          <p className="card-text">{note.description}</p>
          <div className="edits">
            <i
              onClick={() => {
                delNote(note._id);
              }}
              className="fa fa-trash-o"
            ></i>
            <i
              className="fa fa-edit"
              onClick={() => {
                upNote(note);
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

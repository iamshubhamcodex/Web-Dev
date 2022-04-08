import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let [notes, setNotes] = useState([]);
  let [user, setUser] = useState({});
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  // Fetch User Data
  const userData = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let data = await response.json();
    if (data.success) {
      setUser(data.user);
    } else {
      showAlert("Please Authenticate Using a VALID token", "danger");
    }
  };

  // Fetch all Notes
  const fetchNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    let note = await response.json();
    setNotes(note);
  };

  // Add a Note
  const addNote = async (Adnote) => {
    const { title, description } = Adnote;
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    let note = await response.json();
    setNotes((notes = [...notes, note]));
  };

  // Update a Note
  const updateNote = async (upNote) => {
    const { title, description, _id } = upNote;
    await fetch(`${host}/api/notes/updatenote${upNote._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
    });

    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let i = 0; i < newNotes.length; i++) {
      if (newNotes[i]._id === _id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        break;
      }
    }
    setNotes(newNotes);
  };

  // Delete a Note
  const delNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
    showAlert("Deleted Note", "success");
  };

  return (
    <NoteContext.Provider
      value={{
        user,
        notes,
        alert,
        userData,
        setNotes,
        fetchNote,
        delNote,
        addNote,
        updateNote,
        showAlert,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

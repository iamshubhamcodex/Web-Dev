import React from "react";
import Home from "./Components/Home";
import NoteState from "./context/NoteState";

const App = () => {
  return (
    <>
      <NoteState>
        <Home />
      </NoteState>
    </>
  );
};

export default App;

import React from "react";
import { useHistory } from "react-router-dom";
import Note from "./Note";

export default function Home() {
  let history = useHistory();

  const NotLog = () => {
    if (localStorage.getItem("token") !== null) {
      return <Note />;
    } else {
      // history.location("/login");
      console.log(history);
      return "";
    }
  };

  return (
    <>
      <div className="container my-4 position-relative">
        <NotLog />
      </div>
    </>
  );
}

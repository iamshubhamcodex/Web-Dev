import React from "react";
import { useNavigate } from "react-router-dom";
import Note from "./Note";

export default function Home() {
  let history = useNavigate();

  const NotLog = () => {
    if (localStorage.getItem("token") !== null) {
      return <Note />;
    } else {
      history("/login");
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

import React from "react";
import { useHistory } from "react-router";

export default function About() {
  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        Go home
      </button>
    </>
  );
}

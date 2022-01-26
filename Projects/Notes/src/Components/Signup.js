import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import noteContext from "../context/noteContext";

const Signup = () => {
  const nContext = useContext(noteContext);
  const { showAlert, setNotes } = nContext;
  const history = useHistory();
  const [cred, setCred] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const signSub = async (e) => {
    e.preventDefault();
    const { name, email, password, cPassword } = cred;
    if (password === cPassword) {
      const response = await fetch(
        "http://localhost:5000/api/auth/createuser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );
      const token = await response.json();
      if (token.success) {
        setNotes([]);
        localStorage.setItem("token", token.authToken);
        history.push("/Notes");
        showAlert("Account created Successfully", "success");
      } else {
        showAlert(token.error, "danger");
      }
    }
  };
  const credChang = (e) => {
    setCred({
      ...cred,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="container my-4 position-relative">
        <form className="px-4" onSubmit={signSub}>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="Name"
              name="name"
              onChange={credChang}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              name="email"
              aria-describedby="emailHelp"
              onChange={credChang}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="Password"
              onChange={credChang}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="PasswordAg" className="form-label">
              ReEnter your Password
            </label>
            <input
              type="password"
              name="cPassword"
              className="form-control"
              id="PasswordAg"
              onChange={credChang}
            />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="Check" />
            <label className="form-check-label" htmlFor="Check">
              Remember me
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
};
export default Signup;

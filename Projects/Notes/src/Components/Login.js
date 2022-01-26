import React, { useState, useContext } from "react";
import { useHistory } from "react-router";
import noteContext from "../context/noteContext";

function Login() {
  const nContext = useContext(noteContext);
  const { showAlert, setNotes } = nContext;
  const [cred, setCred] = useState({ email: "", password: "" });
  const history = useHistory();

  const logSub = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: cred.email,
        password: cred.password,
      }),
    });
    const token = await response.json();
    if (token.success) {
      setNotes([]);
      localStorage.setItem("token", token.authToken);
      history.push("/Notes");
      showAlert("Logged In Successfully", "success");
    } else {
      showAlert(token.error, "danger");
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
        <form className="px-5" onSubmit={logSub}>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              required
              name="email"
              onChange={credChang}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="Password"
              required
              name="password"
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
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;

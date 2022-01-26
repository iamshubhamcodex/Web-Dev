import React, { useContext } from "react";
import { useHistory } from "react-router";
import { NavLink } from "react-router-dom";
import noteContext from "../context/noteContext";

export default function Navbar(props) {
  const nContext = useContext(noteContext);
  const { user, showAlert, userData } = nContext;
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("token");
    history.push("/login");
    showAlert("Logged Out", "success");
  };
  const userName = () => {
    userData();
    return user.name === undefined ? "Notes" : user.name;
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-capitalize" to="/Notes">
            {userName()}
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/Notes">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/Notes/about">
                  About
                </NavLink>
              </li>
            </ul>
            <div className="d-flex">
              {!localStorage.getItem("token") ? (
                <>
                  <NavLink
                    to="/Notes/signup"
                    role="button"
                    className="mx-2 btn btn-outline-primary"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/Notes/login"
                    role="button"
                    className="mx-2 btn btn-outline-primary"
                  >
                    Login
                  </NavLink>
                </>
              ) : (
                <button
                  className="mx-2 btn btn-outline-primary"
                  onClick={logout}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

import React from "react";
import useApiData from "./parts/ApiFetch";
import { basePath } from "./basePath";
import { NavLink } from "react-router-dom";
import "./Nav.css";
import {
  MyBuilds,
  CreateBuilds,
  ListBuilds,
  Signup,
  Login,
  Logout,
} from "./links/NavLinks";

const classesIfLoggedIn = "navbar-nav flex-grow-1";
const classesIfNotLoggedIn = "navbar-nav ms-auto";

function Nav(props) {
  const [currentUser] = useApiData({
    url: `${basePath}/users/me`,
    withCredentials: true,
  });

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark nav-border">
      <div className="container-fluid">
        <NavLink className="text-decoration-none" to="/">
          <h1 className="navbar-brand text-uppercase fs-2">
            {"Case N' Parts"}
          </h1>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul
            className={props.token ? classesIfLoggedIn : classesIfNotLoggedIn}
          >
            {props.token && currentUser && (
              <>
                <MyBuilds className="" placement="nav" />
                <CreateBuilds className="" placement="nav" />
                <ListBuilds className="" placement="nav" />
                <div className="flex-grow-1"></div>
                <Logout className="" placement="nav" />
              </>
            )}
            {!props.token && (
              <>
                <Login className="" placement="nav" />
                <Signup className="" placement="nav" />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

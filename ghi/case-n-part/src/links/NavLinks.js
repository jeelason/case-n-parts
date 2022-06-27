import { NavLink, Link } from "react-router-dom";
import useApiData from "../parts/ApiFetch";
import { basePath } from "../basePath";

export const MyBuilds = ({ placement }) => {
  return (
    <>
      {placement === "footer" && <Link to={"/builds/mybuilds"}>My Builds</Link>}
      {placement === "nav" && (
        <NavLink className="me-3 mb-3 mb-md-0" to={"builds/mybuilds"}>
          <button className="btn btn-outline-primary w-100">My Builds</button>
        </NavLink>
      )}
    </>
  );
};
export const CreateBuilds = ({ placement }) => {
  return (
    <>
      {placement === "footer" && <Link to={"builds/create"}>Create Build</Link>}
      {placement === "nav" && (
        <NavLink className="me-3 mb-3 mb-md-0" to={"builds/create"}>
          <button className="btn btn-outline-primary w-100">
            Create Build
          </button>
        </NavLink>
      )}
    </>
  );
};

export const ListBuilds = ({ placement }) => {
  return (
    <>
      {placement === "footer" && (
        <Link to={"/builds/listbuilds"}>List Builds</Link>
      )}
      {placement === "nav" && (
        <NavLink className="me-3 mb-3 mb-md-0" to={"/builds/listbuilds"}>
          <button className="btn btn-outline-primary w-100">List Builds</button>
        </NavLink>
      )}
    </>
  );
};

export const Logout = ({ placement }) => {
  const [currentUser] = useApiData({
    url: `${basePath}/users/me`,
    withCredentials: true,
  });
  return (
    <>
      {placement === "footer" && <Link to={"/logout"}>Logout</Link>}
      {placement === "nav" && (
        <NavLink
          className="me-3 mb-3 mb-md-0 justify-content-md-between"
          to={"/logout"}
        >
          <button className="btn btn-outline-primary w-100">
            Logout for: {currentUser.user}
          </button>
        </NavLink>
      )}
    </>
  );
};

export const Login = ({ placement }) => {
  return (
    <>
      {placement === "footer" && <Link to={"/login"}>Login</Link>}
      {placement === "nav" && (
        <NavLink className="me-3 mb-3 mb-md-0" to={"/login"}>
          <button className="btn btn-outline-primary me-4 w-100">Login</button>
        </NavLink>
      )}
    </>
  );
};

export const Signup = ({ placement }) => {
  return (
    <>
      {placement === "footer" && <Link to={"/signup"}>Signup</Link>}
      {placement === "nav" && (
        <NavLink className="me-3 mb-3 mb-md-0" to={"/signup"}>
          <button className="btn btn-outline-primary me-4 w-100">Signup</button>
        </NavLink>
      )}
    </>
  );
};

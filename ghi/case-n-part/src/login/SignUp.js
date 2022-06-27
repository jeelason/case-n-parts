import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
  CardLink,
} from "./Card";

function SignUp(props) {
  const { token, signup } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container mt-5 py-5">
      <CardWrapper>
        <CardHeader>
          <CardHeading>Sign up</CardHeading>
        </CardHeader>
        <CardBody>
          <CardFieldset>
            <CardInput
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              type="text"
              required
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              type="email"
              required
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
              required
            />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              onClick={() => signup(username, email, password)}
              type="submit"
            >
              Create account
            </CardButton>
          </CardFieldset>
          <CardFieldset>
            <NavLink to="/login">
              <CardLink>I already have an account</CardLink>
            </NavLink>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
}

export default SignUp;

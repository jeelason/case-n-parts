import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardButton,
} from "./Card";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, token } = props;

  if (token) {
    return <Navigate to="/builds/mybuilds" />;
  }

  return (
    <div className="container mt-5 py-5">
      <div className="App">
        <CardWrapper>
          <CardHeader>
            <CardHeading>Sign in</CardHeading>
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Password"
                type="password"
                required
              />
            </CardFieldset>

            <CardFieldset>
              <CardButton
                onClick={() => login(username, password)}
                type="button"
              >
                Sign In
              </CardButton>
            </CardFieldset>
          </CardBody>
        </CardWrapper>
      </div>
    </div>
  );
}

export default Login;

import { useEffect, useState, createContext } from "react";

export const UserContext = createContext();
let internalToken = null;

export function getToken() {
  return internalToken;
}

async function getTokenInternal() {
  const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
  try {
    const response = await fetch(url, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      internalToken = data.token;
      return internalToken;
    }
  } catch (e) {}
  return false;
}

export function useToken() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    async function fetchToken() {
      const token = await getTokenInternal();
      setToken(token);
    }
    if (!token) {
      fetchToken();
    }
  }, [token]);

  async function logout() {
    if (token) {
      const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
      await fetch(url, { method: "delete", credentials: "include" });
      internalToken = null;
      setToken(null);
    }
  }

  async function login(username, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`;
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    const response = await fetch(url, {
      method: "post",
      credentials: "include",
      body: form,
    });
    if (response.ok) {
      const token = await getTokenInternal();
      setToken(token);
      return;
    }
    let error = await response.json();
    return error.detail;
  }

  async function signup(username, email, password) {
    const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/users`;
    const response = await fetch(url, {
      credentials: "include",
      method: "post",
      body: JSON.stringify({ username, password, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await login(username, password);
    }
    return false;
  }

  return [token, login, logout, signup];
}

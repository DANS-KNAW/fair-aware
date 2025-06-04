import React, { useEffect, useState } from "react";
import keycloak from "./keycloak";

const AuthButtons = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    keycloak.onAuthSuccess = () => {
      setAuthenticated(true);
      setUsername(keycloak.tokenParsed?.preferred_username || "");
    };
    keycloak.onAuthLogout = () => {
      setAuthenticated(false);
      setUsername("");
    };
  }, []);

  const login = () => keycloak.login();
  const logout = () => keycloak.logout();

  return (
    <>
      {authenticated ? (
        <>
          <p>Welcome, {username}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={login}>Login</button>
      )}
    </>
  );
};

export default AuthButtons;

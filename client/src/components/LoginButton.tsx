import React from "react";
import { useNavigate } from "react-router-dom";

import Auth from "../utils/auth";

const LoginButton = () => {
  const navigate = useNavigate();

  if (Auth.loggedin()) {
    return (
      <div>
        <button onClick={() => navigate("/profile")}>Profile</button>
        <button onClick={Auth.logout}>LOG OUT</button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => navigate("/login")}>LOG IN</button>
        <button onClick={() => navigate("/signup")}>SIGN UP</button>
      </div>
    );
  }
};

export default LoginButton;

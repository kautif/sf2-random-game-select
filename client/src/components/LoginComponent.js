import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function LoginComponent () {
    const [loginUsername, setLoginUsername]  = useState("");
    const [loginPassword, setLoginPassword]  = useState("");
    const login = () => {
      Axios({
        method: "post",
        data: {
          username: loginUsername,
          password: loginPassword
        },
        withCredentials: true,
        url: "http://localhost:4000/login"
      }).then((res) => console.log(res));
    }
    return (
      <div>
        <h1>Login</h1>
        <input placeholder="username" onChange={e => setLoginUsername(e.target.value)} />
        <input placeholder="password" onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>

        <h1>Get User</h1>
        {/* <button onClick={getUser}>Get User</button> */}
      </div>
    );
}

export default LoginComponent;
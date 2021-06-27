import React, { useState } from 'react';
import Axios from 'axios';

function RegisterComponent() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const register = () => {
        Axios({
            method: 'post',
            data: {
                username: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: 'http://localhost:4000/register'
        }).then((res) => {
            console.log(res);
        })
    };
    const getUser = () => {
        Axios({
            method: 'get',
            data: {
                username: registerUsername,
                password: registerPassword
            },
            withCredentials: true,
            url: 'http://localhost:4000/getUser'
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input placeholder="username" onChange={e => setRegisterUsername(e.target.value)} />
            <input placeholder="password" onChange={e => setRegisterPassword(e.target.value)} />
            <button onClick={register}>Submit</button>

            <h1>Get User</h1>
            <button onClick={getUser}>Get User</button>
        </div>
    )

}

export default RegisterComponent;
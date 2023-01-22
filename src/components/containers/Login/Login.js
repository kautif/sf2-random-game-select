import React, {useState, useContext, useEffect} from 'react';
import UserContext from "../../../UserContext";

import "react-bootstrap";
import "bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";

export default function Login () {
    const { userInfo } = useContext(UserContext);

    console.log("hi: ", userInfo);
    const { email, setEmail, password, setPassword, login, setLogin, userEmail, setUserEmail } = userInfo;

    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [login, setLogin] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        const cookies = new Cookies();

        const config = {
            method: "post",
            url: "http://localhost:4000/login",
            data: {
                email,
                password
            }
        }

        axios(config)
            .then(result => {
                cookies.set("token", result.data.token, { path: "/"});
                window.location.href = `/user`;
                console.log("Login result: ", result);
            })
            .catch(error => {
                console.log("Login Error: ", error);
            })

        setLogin(true);
    }

    useEffect(() => {
        window.localStorage.setItem('email', JSON.stringify(email));
    }, [email])

    return (
        <div className="sf2__login-container">
            <Form onSubmit={(e) => handleSubmit(e)}>
                <Form.Group size="lg" controlId="email" className="mt-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autofocus
                        type="email"
                        value={email}
                        onChange={e => {setEmail(e.target.value); console.log("login email: ", email);}}
                        />
                </Form.Group>

                <Form.Group size="lg" controlId="password" className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <div className="text-center">
                    <Button type="submit" block size="lg" className="btn btn-primary mt-4">
                        Login
                    </Button>
                </div>
            </Form>
            {login ? <p className="text-success">Logged In</p> : <p className="text-danger">Not Logged In</p>}
        </div>
    )
}
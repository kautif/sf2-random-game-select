import React, { useEffect, useState, useContext} from "react";
import { Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

import AuthNav from "./containers/AuthNav/AuthNav";
import UserContext from "../UserContext";

export default function Auth () {
    const { userInfo } = useContext(UserContext);
    const { email, setEmail, password, setPassword, login, setLogin, userEmail, setUserEmail } = userInfo;   
    const cookies = new Cookies();
    console.log("cookies: ", cookies);
    const token = cookies.get("token");
    const [message, setMessage] = useState("");
    let currentUser;

    console.log("token: ", token);
// 1/9/23: Perhaps do an axios request to get the user object and display their info on their account page

    useEffect(() => {
        const config = {
            method: "get",
            url: "http://localhost:4000/auth",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

        axios(config)
            .then(result => {
                setMessage(result.data.message);
                console.log("auth result: ", result);
                currentUser = result.data.user;
                setUserEmail(currentUser.email);
            })
            .catch(error => {
                console.log("auth: ", error);
            })

            const localData = window.localStorage.getItem('email');
            setUserEmail(JSON.parse(localData));
            console.log("localData: ", localData);
    }, [])

    const logout = () => {
        cookies.remove("token", { path: "/"});
        window.location.href = "/continue";
    }

    let username = userEmail.substring(0, userEmail.indexOf("@"));

    return (
        <div>
            <AuthNav />
            <h1>Welcome {username}</h1>
            <h3 className="text-center text-danger">{message}</h3>
            <Button type="submit" variant="danger" onClick={() => logout()}>Logout</Button>
        </div>
    )
}
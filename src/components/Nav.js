import React from 'react';
import { Link } from "react-router-dom";


export default function Nav () {
        return (
            <div>
                <ul className="sf-nav">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/register">Register</Link></li>
                </ul>
            </div>
        )
}
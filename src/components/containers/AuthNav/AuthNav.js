import React from 'react';
import { Link } from 'react-router-dom';
import "./AuthNav.css";

export default function AuthNav () {
    return (
        <div className="sf2__authnav">
            <Link to="/user/random_select">Random Select</Link>
            <Link to="/user/find_game">Find Game</Link> 
            <Link to="/user/gameslist">Games List</Link>
        </div>
    )
}
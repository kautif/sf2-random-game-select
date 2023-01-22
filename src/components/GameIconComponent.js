import React from 'react';
export default function GameIconComponent (props) {
    let gameImgPath = props.icon;
    let gameAfterSlash = gameImgPath.lastIndexOf("/");
    let gameBeforePeriod = gameImgPath.indexOf(".");
    let gameName = gameImgPath.substring(gameAfterSlash + 1, gameBeforePeriod);

// Highlight selected
    const current = (e) => {
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
        } 
        document.getElementById(gameName).style.border = 'white 2px solid';
    }

    return (
        <div className="gameIcon-single-container" id={gameName} onClick={() => current()} >
            <img className="gameIcon" src={props.icon} alt="game name" />
        </div>
    )
}
import React, { Component } from 'react';
import soundFile from '../sounds/sf2_char_select.mp3';
import play from '../img/play.png';
import pause from '../img/pause.png';
import stop from '../img/stop.png';
import Sound from 'react-sound';

function handleMusic () {
    document.getElementById("audio-play").play();
    document.getElementById("audio-play").volume = 0.2;
}

function pauseMusic () {
    document.getElementById("audio-play").pause();
}

function stopMusic () {
    document.getElementById("audio-play").pause();
    document.getElementById("audio-play").currentTime = 0;
}

class MusicComponent extends Component {
    render () {
        return (
            <div className="music-container">
                <audio id="audio-play" src={soundFile} loop="loop" autoPlay onPlay={() => document.getElementById("audio-play").volume = 0.25}></audio>
                <i className="fas fa-play" onClick={() => handleMusic()}></i>
                <i className="fas fa-pause" onClick={() => pauseMusic()}></i>
                <i className="fas fa-stop" onClick={() => stopMusic()}></i>
            </div>
        )
    }
}

export default MusicComponent;
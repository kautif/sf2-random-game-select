import React, { Component } from 'react';
import soundFile from '../sounds/sf2_char_select.mp3';
import Sound from 'react-sound';

// let audio = new Audio(soundFile);

// const start = () => {
//     audio.play()
// }

function handleMusic () {
    document.getElementById("audio").play();
    document.getElementById("audio").volume = 0.2;
}

class MusicComponent extends Component {
    render () {
        return (
            <div>
                <audio id="audio" src={soundFile} loop="loop"></audio>
                <button onClick={() => handleMusic()}>Play</button>
            </div>
        )
    }
}

export default MusicComponent;
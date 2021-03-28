import React, { Component } from 'react';
import sf_logo from '../img/sf_logo.png';
import sf_intro from '../img/SF2-Intro-no-loop.gif';

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= 0.1;
    }, 2000);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += 0.1;
    }, 100);
}

let showStart = true;
function flashStart () {
    if (showStart) {
        fade(document.getElementsByClassName("cover-start")[0])
        showStart = false;
        setTimeout(function () {
            flashStart();
        }, 1000)
    } else {
        unfade(document.getElementsByClassName("cover-start")[0])
        showStart = true;
        setTimeout(function () {
            flashStart();
        }, 1000)
    }
}

class CoverComponent extends Component {
    render () {
        return (
            <div className="cover" onLoad={() => flashStart()}>
                <img className="sf-intro" src={sf_intro} alt="street fighter intro gif" loop="false" />
                <h1 className="cover-start">Press Start</h1>
                <div className="cover-logo-container">
                    <div>
                        <img src={sf_logo} alt="street fighter logo" />
                    </div>
                    <div>
                        <h1 className="cover-logo">Random Game</h1>
                        <h1 className="cover-logo cover-select">Select</h1>
                    </div>
                    {/* <div>
                        <h1 className="cover-logo">Select</h1>
                    </div> */}
                </div>
            </div>
        )
    }
}

export default CoverComponent;
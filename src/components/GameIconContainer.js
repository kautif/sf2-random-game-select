import '../App.css';
import React, {Component} from 'react';
import GameIconComponent from './GameIconComponent';
import asura from '../img/asuras_wrath.jpg';
import dragon_age from '../img/dragon_age.png';
import undertale from '../img/undertale.png';
import thirtyxx from '../img/30XX.jpg';
import aragami from '../img/aragami.jpg';
import ash_of_gods from '../img/ash_of_gods.jpg';
import ato from '../img/ato.png';
import baba from '../img/baba.jpg';
import banner_saga from '../img/banner_saga.jpg';
import batman_arkham_knight from '../img/batman_arkham_knight.jpg';
import beyond_two_souls from '../img/beyond_two_souls.jpg';
import blacksad from '../img/blacksad.jpg';
import blazing_chrome from '../img/blazing_chrome.png';
import bloodborne from '../img/bloodborne.jpg';
import bloodstained_ritual from '../img/bloodstained_ritual.jpg';
import bloodstained from '../img/bloodstained.png';
import bushiden from '../img/bushiden.png';
import carrion from '../img/carrion.jpg';
import catherine from '../img/catherine.png';
import cuphead from '../img/cuphead.jpg';
import cyberfunk from '../img/cyberfunk.jpg';
import cybershadow from '../img/cybershadow.jpg';
import daemon from '../img/daemon.jpg';
import dead_cells from '../img/dead_cells.jpg';
import dead_space from '../img/dead_space.jpg';
import deus_ex from '../img/deus_ex.jpg';
import dishonored from '../img/dishonored.jpg';
import dishonored_2 from '../img/dishonored_2.jpg';
import doom_eternal from '../img/doom_eternal.png';
import exanima from '../img/exanima.jpg';
import fell_seal from '../img/fell_seal.jpg';
import friends_ringo from '../img/friends_ringo.jpg';
import god_of_war from '../img/god_of_war.jpg';
import gravity_circuit from '../img/gravity_circuit.jpg';
import gris from '../img/gris.jpg';
import hellpoint from '../img/hellpoint.png';
import huntdown from '../img/huntdown.jpg';
import journey from '../img/journey.png';
import katana_zero from '../img/katana_zero.jpg';
import lit from '../img/lit.jpg';
import mass_builder from '../img/mass_builder.jpg';
import mass_effect from '../img/mass_effect.jpg';
import mega_man_maker from '../img/mega_man_maker.png';
import megaman_legends_2 from '../img/megaman_legends_2.jpg';
import megaman_streetfighter from '../img/megaman_streetfighter.jpg';
import mighty_fight from '../img/mighty_fight.jpg';
import mind_seize from '../img/mind_seize.jpg';
import mortal_shell from '../img/mortal_shell.jpg';
import observer from '../img/observer.jpg';
import one_shot from '../img/one_shot.jpg';
import panzer_paladin from '../img/panzer_paladin.jpg';
import parappa from '../img/parappa.jpg';
import pedro from '../img/pedro.jpg';
import poly_bridge from '../img/poly_bridge.jpg';
import revengeance from '../img/revengeance.jpg';
import salt from '../img/salt.jpg';
import samurai_jack from '../img/samurai_jack.jpg';
import savior from '../img/savior.png';
import super_seducer from '../img/super_seducer.jpg';
import surge from '../img/surge.jpeg';
import surge_2 from '../img/surge_2.png';
import the_pedestrian from '../img/the_pedestrian.jpg';
import thumper from '../img/thumper.jpg';
import tomb_raider from '../img/tomb_raider.jpg';
import um_jammer from '../img/um_jammer.png';
import valfaris from '../img/valfaris.jpg';
import vampyr from '../img/vampyr.jpg';
import watch_dog from '../img/watch_dogs.jpg';
import wildfire from '../img/wildfire.jpg';
import windjammers from '../img/windjammers.jpg';
import witcher_3 from '../img/witcher_3.jpg';

import useSound from 'use-sound';
import select from '../sounds/select_fighter.mp3';
import selected from '../sounds/street_fighter_choose.mp3';
import OnStageComponent from './OnStageComponent';
import MusicComponent from './MusicComponent';

// Calculating weighted random selection
// - Calculate total up until the concerned/current game
// - Depending on the number of votes a game has, it reserves those specific positions
//      - Currently, there are 84 total votes
//      - Undertale has 7 votes. Let's say it's count starts at 13 and after its votes are counted, 
//        the total votes are 20.
//          - It's positions would be 13, 14, 15, 16, 17, 18, 19
//          - Undertale will be associated with an array containing that unique set of numbers
//          - For the random selection, Math.random will be called. With the min being 1 
//            and the max being the total number of votes
//              - If Math.random lands on any of the numbers in Undertale's array, it wins. 
//              - If Math.random lands on any number not in Undertale's array, it doesn't win 
//              (some other game wins)


// import axios from 'axios'
let gameIcons = [asura, dragon_age, undertale, thirtyxx, aragami, ash_of_gods, ato, baba, banner_saga, batman_arkham_knight, beyond_two_souls, blacksad,
    blazing_chrome, bloodborne, bloodstained, bloodstained_ritual, bushiden, carrion, catherine, cuphead, cyberfunk, cybershadow, daemon, dead_cells,
    dead_space, deus_ex, dishonored, dishonored_2, doom_eternal, exanima, friends_ringo, god_of_war, gravity_circuit, gris, hellpoint, huntdown,
    journey, katana_zero, lit, mass_builder, mass_effect, mega_man_maker, megaman_legends_2, megaman_streetfighter, mighty_fight, mind_seize,
    mortal_shell, observer, one_shot, panzer_paladin, parappa, pedro, poly_bridge, revengeance, salt, samurai_jack, savior, super_seducer, surge,
    surge_2, the_pedestrian, thumper, tomb_raider, um_jammer, valfaris, vampyr, watch_dog, wildfire, windjammers, witcher_3];

const games = [];

for (let i = 0; i < gameIcons.length; i++) {
    games.push(<GameIconComponent key={i} icon={gameIcons[i]} />)
}

let currentGameIndex = 0;
let currentGameSrc = '';

let currentGameID = '';
let currentGameNameArr;
let currentGame = '';
let newName = [];
let totalVotes = 0;
let winChance = 0;

const testVotes = {
    "asuras_wrath": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "dragon_age": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "undertale": {
        votes: 7,
        running_total: 0, 
        positions: []
    }
}

let prevTotal = 0;
let nextTotal = 0;

const gameVotes = {
    "asuras_wrath": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "dragon_age": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "undertale": {
        votes: 7,
        running_total: 0,
        positions: []
    },
    "30XX": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "aragami": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "ash_of_gods": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "ato": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "baba": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "banner_saga": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "batman_arkham_knight": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "beyond_two_souls": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "blacksad": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "blazing_chrome": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "bloodborne": {
        votes: 3,
        running_total: 0,
        positions: []
    },
    "bloodstained": {
        votes: 2,
        running_total: 0,
        positions: []
    },
    "bloodstained_ritual": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "bushiden": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "carrion": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "catherine": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "cuphead": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "cyberfunk": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "cybershadow": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "daemon": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "dead_cells": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "dead_space": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "deus_ex": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "dishonored": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "dishonored_2": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "doom_eternal": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "exanima": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "friends_ringo": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "god_of_war": {
        votes: 3,
        running_total: 0,
        positions: []
    },
    "gravity_circuit": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "gris": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "hellpoint": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "huntdown": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "journey": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "katana_zero": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "lit": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "mass_builder": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "mass_effect": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "mega_man_maker": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "megaman_legends_2": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "megaman_streetfighter": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "mighty_fight": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "mind_seize": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "mortal_shell": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "observer": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "one_shot": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "panzer_paladin": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "parappa": {
        votes: 4,
        running_total: 0,
        positions: []
    },
    "pedro": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "poly_bridge": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "revengeance": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "salt": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "samurai_jack": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "savior": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "super_seducer": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "surge": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "surge_2": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "the_pedestrian": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "thumper": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "tomb_raider": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "um_jammer": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "valfaris": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "vampyr": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "watch_dogs": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "wildfire": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "windjammers": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "witcher_3": {
        votes: 1,
        running_total: 0,
        positions: []
    }
}

for (const property in gameVotes) {
    totalVotes += gameVotes[property]['votes'];
}

const gameIconIndex = () => {
    for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
        document.getElementsByClassName('gameIcon-single-container')[i].setAttribute('name', i);
    }
    document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].style.border = 'white 2px solid';
    currentGameSrc = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].firstElementChild.src;
}

function selectIcon (e) {
    e = e || window.event;
    if (e.keyCode === 38) {
        // up arrow
        currentGameIndex -= 10;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
        }
        if (currentGameIndex < 0) {
            currentGameIndex = 0;
        }
        document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].style.border = 'white 2px solid';
        currentGameSrc = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].firstElementChild.src;
        currentGame = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex];
    }
    else if (e.keyCode === 40) {
        // down arrow
        currentGameIndex += 10;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
        }
        if (currentGameIndex >= games.length) {
            currentGameIndex = games.length - 1;
        }
        document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].style.border = 'white 2px solid';
        currentGameSrc = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].firstElementChild.src;
        currentGame = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex];
    }
    else if (e.keyCode === 37) {
        // left arrow
        currentGameIndex -= 1;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
        }
        if (currentGameIndex < 0) {
            currentGameIndex = 0;
        }
        document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].style.border = 'white 2px solid';
        currentGameSrc = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].firstElementChild.src;
        currentGame = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex];
    }
    else if (e.keyCode === 39) {
        // right arrow
        currentGameIndex += 1;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
        }
        if (currentGameIndex >= games.length) {
            currentGameIndex = games.length - 1;
        }
        document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].style.border = 'white 2px solid';
        currentGameSrc = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].firstElementChild.src;
        currentGame = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex];
    } else {
        return null;
    }
    currentGameNameArr = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].id.replace(/_/g, " ").split(" ");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    for (let k = 0; k < currentGameNameArr.length; k++) {
        newName.push(capitalizeFirstLetter(currentGameNameArr[k]));
    }
    currentGameID = document.getElementsByClassName('gameIcon-single-container')[currentGameIndex].id;
    currentGame = newName.join(" ");
    newName = [];
    document.getElementById('stage-name').innerHTML = currentGame;
    document.getElementById('on-stage-img').src = currentGameSrc;
    winChance = gameVotes[currentGameID]['votes'] / totalVotes;
    document.getElementById('stage-stats').innerHTML = "Win Chance: " + winChance.toFixed(3) + "%";
    document.getElementById('game-vote').innerHTML = gameVotes[currentGameID]['votes'];
    document.getElementById('vote-total').innerHTML = totalVotes;
}

function randomSelect () {
    let randomGame;
    let randomGameID;
    let randomCount = 0

    function randomizerInterval () {
            randomGame = Math.floor(Math.random() * (document.getElementsByClassName('gameIcon-single-container').length - 1) + 1);
            for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
                document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
            }
            document.getElementsByClassName('gameIcon-single-container')[randomGame].style.border = 'white 2px solid';
    
            randomGameID = document.getElementsByClassName('gameIcon-single-container')[randomGame].id;
            currentGameNameArr = randomGameID.replace(/_/g, " ").split(" ");
    
            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
    
            for (let k = 0; k < currentGameNameArr.length; k++) {
                newName.push(capitalizeFirstLetter(currentGameNameArr[k]));
            }
    
            currentGame = newName.join(" ");
            newName = [];
    
            document.getElementById('stage-name').innerHTML = currentGame;
            document.getElementById('on-stage-img').src = document.getElementsByClassName('gameIcon-single-container')[randomGame].children[0].src;
            winChance = gameVotes[randomGameID]['votes'] / totalVotes;
            document.getElementById('stage-stats').innerHTML = "Win Chance: " + winChance.toFixed(3) + "%";
            document.getElementById('game-vote').innerHTML = gameVotes[randomGameID]['votes'];
            document.getElementById('vote-total').innerHTML = totalVotes;

            document.getElementById('select').pause();
            if (document.getElementById('select').paused) {
                document.getElementById('select').currentTime = 0;
                document.getElementById('select').play();
            } else {
                document.getElementById('select').play();
            }
    }

    var time=225;
    function myFunction() {
        if (randomCount < 40) {
            setTimeout(function(){ 
                randomCount++;
                myFunction();
                randomizerInterval();
            }, time);
        }

        if ((randomCount >= 40) && (randomCount < 55)) {
            time = 350;
            setTimeout(function(){ 
                randomCount++;
                console.log("Hello");
                randomizerInterval(); 
                myFunction();
            }, time);
        }
        
        if ((randomCount >= 55) && (randomCount < 65)) {
            time = 500;
            setTimeout(function(){ 
                randomCount++;
                console.log("Hello");
                randomizerInterval(); 
                myFunction();
            }, time);
        }

        if ((randomCount >= 65) && (randomCount < 72)) {
            time = 750;
            setTimeout(function(){ 
                randomCount++;
                console.log("Hello");
                randomizerInterval(); 
                myFunction();
            }, time);
        }

        if ((randomCount >= 72) && (randomCount < 76)) {
            time = 1000;
            setTimeout(function(){ 
                randomCount++;
                console.log("last interval");
                randomizerInterval(); 
                myFunction();
            }, time);
        }

        if (randomCount === 76) {
            selectWinner();
            console.log("run selectWinner");
        }
        return false;
    }

    myFunction();

    randomCount = 0;
}

function selectWinner () {
    let winner = Math.floor(Math.random() * (totalVotes - 1) + 1);
    let keys = Object.keys( gameVotes );
    
    for (let z = 0; z < keys.length; z++) {
        if (z === 0) {
            nextTotal += gameVotes[keys[z]]['votes'];
            gameVotes[keys[z]]['running_total'] = nextTotal;
            gameVotes[keys[z]]['positions'].push(gameVotes[keys[z]]['votes']);
        } else {
            nextTotal += gameVotes[keys[z]]['votes'];
            gameVotes[keys[z]]['running_total'] = nextTotal;
            for (let k = gameVotes[keys[z - 1]]['running_total']; 
                    k < gameVotes[keys[z]]['running_total'];
                    k++) {
                gameVotes[keys[z]]['positions'].push(k + 1);
            }
        }
    }
    
    for (const property in gameVotes) {
        if (gameVotes[property]['positions'].includes(winner)) {
            for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
                document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
            }
            document.getElementById(property).style.border = 'white 2px solid';

            currentGameNameArr = document.getElementById(property).id.replace(/_/g, " ").split(" ");

            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
            for (let k = 0; k < currentGameNameArr.length; k++) {
                newName.push(capitalizeFirstLetter(currentGameNameArr[k]));
            }

            currentGame = newName.join(" ");
            newName = [];

            document.getElementById('selected').play();
            document.getElementById('stage-name').innerHTML = currentGame;
            console.log(`random select game: ${currentGame}`);
            document.getElementById('on-stage-img').src = document.getElementById(property).children[0].src;
            winChance = gameVotes[property]['votes'] / totalVotes;
            document.getElementById('stage-stats').innerHTML = "Win Chance: " + winChance.toFixed(3) + "%";
            document.getElementById('game-vote').innerHTML = gameVotes[property]['votes'];
            document.getElementById('vote-total').innerHTML = totalVotes;
        }
    }
}

window.onkeydown = (e) => {
    e = e || window.event;
    console.log(e.keyCode);
    selectIcon();
    if (e.keyCode === 38 || 
        e.keyCode === 40 ||
        e.keyCode === 37 ||
        e.keyCode === 39) {
            document.getElementById('select').pause();
            if (document.getElementById('select').paused) {
                document.getElementById('select').currentTime = 0;
                document.getElementById('select').play();
            } else {
                document.getElementById('select').play();
            }
    }
}

class GameIconContainer extends Component { 
    constructor (props) {
        super (props)
        this.state = {
            votes: {
                asuras_wrath: 1,
                dragon_age: 2
            }
        }
    } 

    render () {
        return (
            <div className="games-container">
                <MusicComponent />
                <div className="gamesIcons-container">
                    <div className="gameIcon-flex" onLoad={() => gameIconIndex()}>
                        {games}
                        <audio id="select" src={select}></audio>
                        <audio id="selected" src={selected}></audio>
                    </div>
                    <OnStageComponent />
                </div>
                <p id="random-select-btn" onClick={() => randomSelect()}>Random Select</p>   
            </div>
        )
    }    
}

export default GameIconContainer;
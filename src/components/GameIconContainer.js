import '../App.css';
import React, {Component} from 'react';
import GameIconComponent from './GameIconComponent';
import dragon_age from '../img/dragon_age.png';
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
import bushiden from '../img/bushiden.png';
import carrion from '../img/carrion.jpg';
import catherine from '../img/catherine.png';
import cuphead from '../img/cuphead.jpg';
import cyberfunk from '../img/cyberfunk.jpg';
import cybershadow from '../img/cybershadow.jpg';
import daemon from '../img/daemon.jpg';
import darksiders from '../img/darksiders.jpg'
import dead_cells from '../img/dead_cells.jpg';
import dead_space from '../img/dead_space.jpg';
import deus_ex from '../img/deus_ex.jpg';
import dishonored from '../img/dishonored.jpg';
import dishonored_2 from '../img/dishonored_2.jpg';
import doom_eternal from '../img/doom_eternal.png';
import exanima from '../img/exanima.jpg';
import fell_seal from '../img/fell_seal.jpg';
import friends_ringo from '../img/friends_ringo.jpg';
import ghosts_n_goblins from '../img/ghosts_n_goblins.png';
import god_of_war from '../img/god_of_war.jpg';
import gravity_circuit from '../img/gravity_circuit.jpg';
import gris from '../img/gris.jpg';
import harry_potter_chamber_of_secrets from '../img/harry_potter_chamber_of_secrets.jpg';
import hellpoint from '../img/hellpoint.png';
import hitchhiker from '../img/hitchhiker.jpg';
import huntdown from '../img/huntdown.jpg';
import journey from '../img/journey.png';
import katana_zero from '../img/katana_zero.jpg';
import lit from '../img/lit.jpg';
import majoras_mask from '../img/majoras_mask.jpg';
import mass_builder from '../img/mass_builder.jpg';
import mass_effect from '../img/mass_effect.jpg';
import mega_man_maker from '../img/mega_man_maker.png';
import megaman_legends_2 from '../img/megaman_legends_2.jpg';
import megaman_streetfighter from '../img/megaman_streetfighter.jpg';
import metal_gear_solid_5 from '../img/metal_gear_solid_5.png';
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
import ring_fit_adventure from '../img/ring_fit_adventure.jpg';
import salt from '../img/salt.jpg';
import samurai_jack from '../img/samurai_jack.jpg';
import savior from '../img/savior.png';
import sonic_adventure from '../img/sonic_adventure.png';
import steamworld_dig_2 from '../img/steamworld_dig_2.jpg';
import super_mario_64 from '../img/super_mario_64.jpg';
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

let gameIcons = [darksiders, dragon_age, thirtyxx, aragami, ash_of_gods, ato, baba, banner_saga, batman_arkham_knight, beyond_two_souls, blacksad,
    blazing_chrome, bloodborne, bloodstained_ritual, bushiden, carrion, catherine, cuphead, cyberfunk, cybershadow, daemon, dead_cells,
    dead_space, deus_ex, dishonored, dishonored_2, doom_eternal, exanima, friends_ringo, ghosts_n_goblins, god_of_war, gravity_circuit, gris, harry_potter_chamber_of_secrets, hellpoint, huntdown, hitchhiker,
    journey, katana_zero, lit, majoras_mask, mass_builder, mass_effect, mega_man_maker, megaman_legends_2, megaman_streetfighter, metal_gear_solid_5, mighty_fight, mind_seize,
    mortal_shell, observer, one_shot, panzer_paladin, parappa, pedro, poly_bridge, revengeance, ring_fit_adventure, salt, samurai_jack, savior, sonic_adventure, steamworld_dig_2, super_mario_64, super_seducer, surge,
    surge_2, the_pedestrian, thumper, tomb_raider, um_jammer, valfaris, vampyr, watch_dog, wildfire, windjammers, witcher_3];

const games = [];

for (let i = 0; i < gameIcons.length; i++) {
    games.push(<GameIconComponent key={i} icon={gameIcons[i]} />)
}

let currentGameIndex = 0;
let currentGameSrc = '';
let currentGame = '';
let newName = [];
let totalVotes = 0;
let winChance = 0;

let nextTotal = 0;

const gameVotes = {
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
        votes: 103,
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
    "darksiders": {
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
        votes: 2,
        running_total: 0,
        positions: []
    },
    "deus_ex": {
        votes: 6,
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
    "dragon_age": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "exanima": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "fell_seal": {
        votes: 11,
        running_total: 0,
        positions: []
    },
    "friends_ringo": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "god_of_war": {
        votes: 4,
        running_total: 0,
        positions: []
    },
    "gravity_circuit": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "gris": {
        votes: 11,
        running_total: 0,
        positions: []
    },
    "ghosts_n_goblins": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "harry_potter_chamber_of_secrets": {
        votes: 11,
        running_total: 0,
        positions: []
    },
    "hellpoint": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "hitchhiker": {
        votes: 10,
        running_total: 0,
        positions: []
    },
    "huntdown": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "journey": {
        votes: 11,
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
    "majoras_mask": {
        votes: 40,
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
    "metal_gear_solid_5": {
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
        votes: 21,
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
        votes: 8,
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
    "ring_fit_adventure": {
        votes: 109,
        running_total: 0,
        positions: []
    },
    "salt": {
        votes: 11,
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
    "sonic_adventure": {
        votes: 5,
        running_total: 0,
        positions: []
    },
    "steamworld_dig_2": {
        votes: 5,
        running_total: 0,
        positions: []
    },
    "super_mario_64": {
        votes: 1,
        running_total: 0,
        positions: []
    },
    "super_seducer": {
        votes: 12,
        running_total: 0,
        positions: []
    },
    "surge": {
        votes: 11,
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
        votes: 22,
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

function updateStage (gameIndex) {
    let gameID = document.getElementsByClassName('gameIcon-single-container')[gameIndex].id;
    let gameNameArr = [];
    let nameArr = [];
    let currentGame = '';
    gameNameArr = document.getElementsByClassName('gameIcon-single-container')[gameIndex].id.replace(/_/g, " ").split(" ");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    for (let k = 0; k < gameNameArr.length; k++) {
        nameArr.push(capitalizeFirstLetter(gameNameArr[k]));
    }
    currentGame = nameArr.join(" ");
    console.log(currentGame);
    nameArr = [];

    document.getElementById('stage-name').innerHTML = currentGame;
    document.getElementById('on-stage-img').src = document.getElementsByClassName('gameIcon-single-container')[gameIndex].firstElementChild.src;;
    winChance = gameVotes[gameID]['votes'] / totalVotes * 100;
    document.getElementById('stage-stats').innerHTML = "Win Chance: " + winChance.toFixed(2) + "%";
    document.getElementById('game-vote').innerHTML = gameVotes[gameID]['votes'];
    document.getElementById('vote-total').innerHTML = totalVotes;
}

function selectIcon (e) {
    e = e || window.event;

    function removeBorder (index) {
        document.getElementsByClassName('gameIcon-single-container')[index].style.border = 'none';
    }

    function addBorder (index) {
        document.getElementsByClassName('gameIcon-single-container')[index].style.border = 'white 2px solid';
        currentGameSrc = document.getElementsByClassName('gameIcon-single-container')[index].firstElementChild.src;
        currentGame = document.getElementsByClassName('gameIcon-single-container')[index];
    }

    if (e.keyCode === 38) {
        // up arrow
        currentGameIndex -= 10;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            removeBorder(i);
        }
        if (currentGameIndex < 0) {
            currentGameIndex = 0;
        }
        addBorder(currentGameIndex);
    }
    else if (e.keyCode === 40) {
        // down arrow
        currentGameIndex += 10;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            removeBorder(i);
        }
        if (currentGameIndex >= games.length) {
            currentGameIndex = games.length - 1;
        }
        addBorder(currentGameIndex);
    }
    else if (e.keyCode === 37) {
        // left arrow
        currentGameIndex -= 1;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            removeBorder(i);
        }
        if (currentGameIndex < 0) {
            currentGameIndex = 0;
        }
        addBorder(currentGameIndex);
    }
    else if (e.keyCode === 39) {
        // right arrow
        currentGameIndex += 1;
        for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
            removeBorder(i);
        }
        if (currentGameIndex >= games.length) {
            currentGameIndex = games.length - 1;
        }
        addBorder(currentGameIndex);
    } else {
        return null;
    }
    updateStage(currentGameIndex);
}

function showSelection (gameIndex) {
    for (let i = 0; i < document.getElementsByClassName('gameIcon-single-container').length; i++) {
        document.getElementsByClassName('gameIcon-single-container')[i].style.border = 'none';
    }
    document.getElementsByClassName('gameIcon-single-container')[gameIndex].style.border = 'white 2px solid';    
}

function randomSelect () {
    let randomGame;
    let randomCount = 0
    function randomizerInterval () {
            randomGame = Math.floor(Math.random() * (document.getElementsByClassName('gameIcon-single-container').length - 1) + 1);
            showSelection(randomGame);
            updateStage(randomGame);
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
                randomizerInterval(); 
                myFunction();
            }, time);
        }
        
        if ((randomCount >= 55) && (randomCount < 65)) {
            time = 500;
            setTimeout(function(){ 
                randomCount++;
                randomizerInterval(); 
                myFunction();
            }, time);
        }

        if ((randomCount >= 65) && (randomCount < 72)) {
            time = 750;
            setTimeout(function(){ 
                randomCount++;
                randomizerInterval(); 
                myFunction();
            }, time);
        }

        if ((randomCount >= 72) && (randomCount < 76)) {
            time = 1000;
            setTimeout(function(){ 
                randomCount++;
                randomizerInterval(); 
                myFunction();
            }, time);
        }

        if (randomCount === 76) {
            selectWinner();
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
            console.log(`winner: ${property}`);
            showSelection(property);
            updateStage(property);
            document.getElementById('selected').play();
        }
    }
}

window.onkeydown = (e) => {
    e = e || window.event;
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

export default function GameIconContainer () { 
    // constructor (props) {
    //     super (props)
    //     this.state = {
    //         votes: {
    //             asuras_wrath: 1,
    //             dragon_age: 2
    //         }
    //     }
    // }    
    
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
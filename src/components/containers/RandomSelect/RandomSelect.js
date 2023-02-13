import React, {useEffect, useContext, useState, useCallback, useRef} from 'react';
import axios from "axios";
import "./RandomSelect.css";

import UserContext from '../../../UserContext';
import OnStageComponent from "../OnStage/OnStage";
import select from '../../../sounds/select_fighter_cut.mp3';
import selected from '../../../sounds/street_fighter_choose.mp3';

let votesArr = [];
// let gameIndex = 0;
export default function RandomSelect () {
    const localData = window.localStorage.getItem('email');
    const localDataEmail = JSON.parse(localData);
    const { userInfo } = useContext(UserContext);
    const {userGames, setUserGames } = userInfo;
    // const [selected, setSelected] = useState(false);
    const [gameIndex, setGameIndex] = useState(0);
    const gameRef = useRef([]);

    async function getGames () {
        await axios("http://localhost:4000/getgames", {
            params: {
                email: localDataEmail
            }
        }).then(result => {
            setUserGames(result.data.response.games);
        }).catch(err => {
            console.error("randomSelect err: ", err)
        })
    }

    function randomSelect() {
        let randomGame;
        function randomizerInterval() {
            randomGame = Math.floor(Math.random() * (document.getElementsByClassName('gameIcon-single-container').length - 1) + 1);
            // showSelection(randomGame);
            // updateStage(randomGame);
            document.getElementById('select').play();
            document.getElementById('select').currentTime = 0;
        }
    }

    function itemsPerRow() {

    }

    useEffect(() => {
        getGames();
    }, [])

    useEffect(() => {
        window.onkeydown = function (e) {
            console.log("number of items in row: ");
            let gameArrEnd = userGames.length - 1;
            let itemsPerRow = Math.floor(document.getElementsByClassName("randomselect__games__container")[0].offsetWidth / document.getElementsByClassName("randomselect__game__img")[0].offsetWidth);

            // 2/9/23: Can't assign values to state otherwise they won't render. 
                // Only pass new value into setter function

                if (e.keyCode === 37 ||
                    e.keyCode === 38 ||
                    e.keyCode === 39 ||
                    e.keyCode === 40) {
                        document.getElementById('select').play();
                        document.getElementById('select').currentTime = 0;
                }

            // right
            if (gameIndex < gameArrEnd 
                    && e.keyCode === 39) {
                setGameIndex(gameIndex + 1);
            }

            // left
            if (gameIndex > 0 && e.keyCode === 37) {
                setGameIndex(gameIndex - 1)
            }

            // up
            if (gameIndex > 0 && e.keyCode === 38) {
                setGameIndex(Math.max(gameIndex - itemsPerRow, 0));
            }

            if (gameIndex < 0) {
                setGameIndex(0);
            }

            // down
            if (gameIndex < gameArrEnd && e.keyCode === 40) {
                setGameIndex(Math.min(gameIndex + itemsPerRow, gameArrEnd))
            }
        }

        // highlightGame();
    }, [userGames, gameIndex])


    // 2/7/23: Was attempting to make width of game icons change dynamically based on width of container, but
        // it wasn't working 
    // document.addEventListener("DOMContentLoaded", () => {
    //     let containerWidth = document.getElementsByClassName("randomselect__container")[0].clientWidth;
    //     console.log("containerWidth: ", containerWidth);
    //     let gameIconWidth = containerWidth / 10;
    //     setIconWidth(gameIconWidth);
    //     iconWidth && setIconDimensions(iconWidth);
    // })

    return (
        <div className="randomselect">
            <div className="randomselect__games__container">
                {/* {console.log("userGames: ", userGames)} */}
                {userGames && userGames.map((game, i) => {
                    for (let v = 0; v < game.votes; v++) {
                        votesArr.push(i);
                    }
                })}
                
                {userGames && userGames.map((game, index) => {
                    return (
                        <div className={`randomselect__game ${gameIndex === index ? "randomselect__game-selected" : ""}`} key={index}>
                            <img className="randomselect__game__img" src={game.img_url} alt={"cover of " + game.name} />
                        </div>
                    )
                })}
                <p id="random-select-btn">Random Select</p>
                <audio id="select" src={select}></audio>
                <audio id="selected" src={selected}></audio>
            </div>
            {userGames.length && <OnStageComponent 
                stageName={userGames[gameIndex].name}
                stage={userGames[gameIndex].img_url}
                votes={userGames[gameIndex].votes} />}
        </div>
    )
}
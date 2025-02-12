import React, {useContext, useEffect, useState} from "react";
import AuthNav from "../AuthNav/AuthNav";
import axios from "axios";
import UserContext from "../../../UserContext";
import { getDefaultNormalizer } from "@testing-library/react";
import { Button, Form } from "react-bootstrap";
import "./Gameslist.css";

let allGames;
let gamesListArr = [];

export default function Gameslist () {
    const { userInfo } = useContext(UserContext);
    const { email, setEmail, 
            password, setPassword, 
            login, setLogin, 
            userEmail, setUserEmail, 
            userGames, setUserGames } = userInfo;
    const [sortedGames, setSortedGames] = useState([]);

    const localData = window.localStorage.getItem('email');
    const localDataEmail = JSON.parse(localData);
    const backendURL = process.env.REACT_APP_NODE_BACKEND || "http://localhost:4000"

    function sortGames() {
        // const sortedGames = games.sort(function(a, b) {
        //     return b.votes - a.votes;
        // })
        const sortedGames = allGames.sort(function(a, b) {
            return b.votes - a.votes;
        })
        // console.log("sortedGames: ", sortedGames);
    }

    async function getGames() {
        await axios(backendURL + "/getgames", {
            params: {
                email: localDataEmail
            }
        }).then(result => {
            allGames = result.data.response.games;
            console.log("allGames: ", allGames);
            allGames.map(game => {
                setUserGames(prevUserGames => {
                    return [...prevUserGames, game];
                })
            })
            sortGames();
        }).catch(err => {
            console.log("Error: no games found");
        })
    }
    async function updateVotes (e, gameName, gameVotes) {
        e.preventDefault();
        let assignedVotes;

        if (e.target.tagName === "FORM") {
            assignedVotes = e.target.children[1].value;
        } else {
            assignedVotes = e.target.parentElement.previousSibling.value;
        }

        console.log("assignedVotes: ", assignedVotes);  

        if (assignedVotes !== "") {
            const config = {
                method: "put",
                url: `${backendURL}/updatevotes`,
                data: {
                    email: localDataEmail,
                    games: {
                        name: gameName,
                        votes: assignedVotes,
                        oldVotes: gameVotes
                    }
                }
            }

        await axios(config)
            .then(result => {
                console.log("update votes result: ", result);
            }).catch(err => {
                console.log("update vote Error: ", err);
            })
        } else {
            alert("Input field cannot be empty. Please enter a number. Thanks.");
            return;
        }
    }

    async function deleteGame (e, gameName) {
        e.preventDefault();
        const config = {
            method: "delete",
            url: `${backendURL}/deletegame`,
            data: {
                email: localDataEmail,
                games: {
                    name: gameName
                }
            }
        }

       await axios(config)
            .then(result => {
                console.log("deleted game: ", result);
            }).catch(err => {
                console.log("deletion failed: ", err);
            })
    }

    useEffect(() => {
        getGames();
    }, [])

    const arrangedGames = userGames.map((game, i) => {
        if (i === 0) {
            console.log("sortedGames: ", sortedGames);
            console.log("userGames: ", userGames);
        }
            return (
        
                <div className="gameslist__game" key={"gameslist-game-" + i}>
                    <h2 className="gameslist__game__title">{game.name}</h2>
                    <img src={game.img_url} alt={game.name + " cover"} className="gameslist__game__img"/>
                    <div className="gameslist__game__votes-container">
                        <h3>Current Votes</h3>
                        <p className="gameslist__game__votes">{game.votes}</p>
                    </div>
                    <Form onSubmit={(e) => 
                                    {updateVotes(e, game.name, game.votes); 
                                        setTimeout(function() {
                                            window.location.reload()
                                        }, 1000)}}>
                        <Form.Label className="gameslist__game__votes-label">Change To</Form.Label>
                        <Form.Control
                            className="gameslist__game__votes" 
                            type="number"
                            placeholder="Update to desired number of votes. Numbers only"
                            />
                        <div className="gameslist__game__buttons">
                            <Button onClick={(e) => {
                                updateVotes(e, game.name, game.votes); 
                                setTimeout(function() {
                                  window.location.reload()
                                }, 1000) }}>Submit</Button>
                            <Button onClick={(e) => {deleteGame(e, game.name); window.location.reload(); }}>Delete</Button>
                        </div>
                    </Form>
                </div>
            )
     })

    return (
            <div className="sf2-gameslist-container">
                <h1>Current Gameslist</h1>
                <div className="sf2-gameslist__allgames">
                    {arrangedGames}
                </div>
            </div>
    )

}
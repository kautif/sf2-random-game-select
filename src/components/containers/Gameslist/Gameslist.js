import React, {useContext, useEffect, useState} from "react";
import AuthNav from "../AuthNav/AuthNav";
import axios from "axios";
import UserContext from "../../../UserContext";
import { getDefaultNormalizer } from "@testing-library/react";
import { Button, Form } from "react-bootstrap";

let allGames;
let gamesListArr = [];

export default function Gameslist () {
    const { userInfo } = useContext(UserContext);
    const { email, setEmail, password, setPassword, login, setLogin, userEmail, setUserEmail } = userInfo;
    const [userGames, setUserGames] = useState([]);

    const localData = window.localStorage.getItem('email');
    const localDataEmail = JSON.parse(localData);

    async function getGames() {
        await axios("http://localhost:4000/getgames", {
            params: {
                email: localDataEmail
            }
        }).then(result => {
            allGames = result.data.response.games;
            allGames.map(game => {
                setUserGames(prevUserGames => {
                    return [...prevUserGames, game];
                })
            })
        }).catch(err => {
            console.log("Error: no games found");
        })
    }

    useEffect(() => {
        getGames();
    }, [])

    async function updateVotes (e, gameName, gameVotes) {
        e.preventDefault();
        let assignedVotes;

        if (e.target.tagName === "FORM") {
            console.log("FORM votes: ", e.target.children[1].value);
            assignedVotes = e.target.children[1].value;
        } else {
            assignedVotes = e.target.parentElement.children[1].value
        }

        const config = {
            method: "put",
            url: "http://localhost:4000/updatevotes",
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
                console.log("update vote: ", result);
            }).catch(err => {
                console.log("update vote Error: ", err);
            })
    }

    const arrangedGames = userGames.map((game, i) => {
        return (
            <div className="gameslist__game" key={"gameslist-game-" + i}>
                <h2 className="gameslist__game__title">{game.name}</h2>
                <img src={game.img_url} alt={game.name + " cover"} className="gameslist__game__img"/>
                <div>
                    <h3>Current Votes</h3>
                    <p className="gameslist__game__votes">{game.votes}</p>
                </div>
                <Form onSubmit={(e) => {updateVotes(e, game.name, game.votes); window.location.reload();}}>
                    <Form.Label>Change To</Form.Label>
                    <Form.Control
                        className="gameslist__game__votes" 
                        type="number"
                        />
                    <Button onClick={(e) => {updateVotes(e, game.name, game.votes); window.location.reload();}}>Submit</Button>
                </Form>
            </div>
        )
     })

    return (
        <div>
            <AuthNav />
            Gameslist
            {arrangedGames}
            {console.log("gamesListArr: ", userGames)}
        </div>
    )
}
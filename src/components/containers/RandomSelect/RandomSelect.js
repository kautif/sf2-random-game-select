import React, {useEffect, useContext} from 'react';
import axios from "axios";
import "./RandomSelect.css";

import UserContext from '../../../UserContext';
import OnStageComponent from "../../OnStageComponent";


let votesArr = [];
export default function RandomSelect () {
    const localData = window.localStorage.getItem('email');
    const localDataEmail = JSON.parse(localData);
    const { userInfo } = useContext(UserContext);

    const {userGames, setUserGames } = userInfo

    async function getGames () {
        await axios("http://localhost:4000/getgames", {
            params: {
                email: localDataEmail
            }
        }).then(result => {
            setUserGames(result.data.response.games);
        }).catch(err => {
            console.log("randomSelect err: ", err)
        })
    }

    useEffect(() => {
        getGames();
    }, [])
    return (
        <div className="randomselect__container">
            {userGames && userGames.map((game, i) => {
                for (let v = 0; v < game.votes; v++) {
                    votesArr.push(i);
                }
            })}
            {console.log("votesArr: ", votesArr)}
            
            {userGames && userGames.map(game => {
                return (
                    <div className="randomselect__game">
                        <img src={game.img_url} alt={"cover of " + game.name} />
                    </div>
                )
            })}
        </div>
    )
}
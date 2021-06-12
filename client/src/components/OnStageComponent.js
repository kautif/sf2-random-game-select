import React from 'react';

const OnStageComponent = props => {
    console.log(props);
    return (
        <div className="on-stage">
            <h1 id="stage-name" class="game-names">{props.stageName}</h1>
            <img id="on-stage-img" class="game-images" src={props.stage}/>
    <h1 id="vote-ratio" class="game-votes"><span id="game-vote">#</span> votes out of <span id="vote-total">total</span></h1>
    <h1 id="stage-stats" class="game-totals">Win Chance: 0 {props.stats}</h1>
        </div>
    )
}

export default OnStageComponent;
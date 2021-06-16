import React from 'react';
import ReactDOM from 'react-dom';
import GameIconContainer from './components/GameIconContainer';
import MusicComponent from './components/MusicComponent';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import CoverComponent from './components/CoverComponent';

function App() {
  let isAuth = false;
  return (
    <div className="App">
      {isAuth ? 
      window.location.href = "http://localhost:3001/api" : 
      <Router>
        <Route exact path="/" component={CoverComponent}></Route>
        <Route path="/random_select" component={GameIconContainer}></Route>  
      </Router>}
      {/* <MusicComponent /> */}
      {/* <GameIconContainer /> */}
    </div>
  );
}

export default App;
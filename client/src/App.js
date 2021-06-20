import React from 'react';
import ReactDOM from 'react-dom';
import GameIconContainer from './components/GameIconContainer';
import MusicComponent from './components/MusicComponent';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Switch, Redirect } from "react-router-dom";
import CoverComponent from './components/CoverComponent';
import NavComponent from './components/NavComponent';

function App() {
  let isAuth = true;
  return (
    <div className="App">
      <NavComponent />
      <Router>
        <Route exact path="/" component={CoverComponent}></Route>
        <Route path="/random_select" component={GameIconContainer}></Route>
        <Route path="/login"></Route>
        <Route path="/register"></Route>  
      </Router>
      {/* {isAuth ? 
      window.location.href = "http://localhost:3001/api" : 
      } */}
      {/* <MusicComponent /> */}
      {/* <GameIconContainer /> */}
    </div>
  );
}

export default App;
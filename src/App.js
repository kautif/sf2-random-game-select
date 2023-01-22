import React from 'react';
import ReactDOM from 'react-dom';
import GameIconContainer from './components/GameIconContainer';
import MusicComponent from './components/MusicComponent';
import { BrowserRouter as Router, Route, Link, BrowserRouter, Switch } from "react-router-dom";
import CoverComponent from './components/CoverComponent';
import Continue from './components/containers/Continue/Continue';
import FreeComponent from './components/FreeComponent';
import Auth from './components/Auth';
import ProtectedRoute from './components/ProtectedRoute';
import FindGame from './components/containers/FindGame/FindGame';
import Gameslist from './components/containers/Gameslist/Gameslist';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={CoverComponent}></Route>
        <Route path="/random_select" component={GameIconContainer}></Route>
        <Route path="/continue" component={Continue}></Route>
        <Route path="/open" component={FreeComponent}></Route>
        <ProtectedRoute exact path="/user" component={ Auth } />
        <ProtectedRoute path="/user/find_game" component={ FindGame } />
        <ProtectedRoute path="/user/gameslist" component={ Gameslist } />
      </Router>
      {/* <MusicComponent /> */}
      {/* <GameIconContainer /> */}
    </div>
  );
}

export default App;
import GameIconContainer from './components/GameIconContainer';
import MusicComponent from './components/MusicComponent';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CoverComponent from './components/CoverComponent';

function App() {
  return (
    <div className="App">
      <CoverComponent />
      <Router>
        <Route path="/random_select" component={GameIconContainer}/>  
      </Router>
      {/* <MusicComponent /> */}
      {/* <GameIconContainer /> */}
    </div>
  );
}

export default App;

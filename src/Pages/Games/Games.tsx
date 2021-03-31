import React from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import MakeWordGame from '../../components/MakeWordGame/MakeWordGame';

const Games:React.FC = () => (
  <div className="games-wrapper">
    <div className="game-links">
      <NavLink className="game-link" to="/games/make-word">Make Words</NavLink>
      <NavLink className="game-link" to="/games/savan">Savan</NavLink>
      <NavLink className="game-link" to="/games/audio-battle">Audio battle</NavLink>
      <NavLink className="game-link" to="/games/sprint">Sprint</NavLink>
    </div>
    <div className="game-wrapper">
      <Switch>
        <Route path="/games/make-word" component={MakeWordGame} />
      </Switch>
    </div>
  </div>
);

export default Games;

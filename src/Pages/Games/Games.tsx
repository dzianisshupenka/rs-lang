import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChooseGame from '../../components/ChooseGame';
import MakeWordGame from '../../components/MakeWordGame/MakeWordGame';
import SavannaGame from '../../components/SavannaGame/SavannaGame';
import AudioBatle from '../../components/AudioBattle/AudioBattle';

const Games:React.FC = () => (
  <div className="games-wrapper">
    <div className="game-wrapper">
      <Switch>
        <Route path="/games/" exact component={ChooseGame} />
        <Route path="/games/make-word" component={MakeWordGame} />
        <Route path="/games/savanna" component={SavannaGame} />
        <Route path="/games/audio-battle"><AudioBatle page={1} group={0} /></Route>
      </Switch>
    </div>
  </div>
);

export default Games;

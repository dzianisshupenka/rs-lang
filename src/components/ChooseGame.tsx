import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../redux/store';
import { setCurrentGroup } from '../redux/words-reducer';

type MapStateToPropsType = {
  group: number,
};

type MapDispatchToPropsType = {
  setCurrentGroup: (currentGroup: number) => void,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const ChooseGame:React.FC<PropsType> = ({ group, setCurrentGroup } : PropsType) => {
  const [game, setGame] = useState<string>('MakeWord');
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    setLevel(group);
  }, []);

  const history = useHistory();

  const startGameHandler = () => {
    switch (game) {
      case 'MakeWord':
        history.push('/games/make-word');
        break;
      case 'Savanna':
        history.push('/games/savanna');
        break;
      case 'AudioBattle':
        history.push('/games/audio-battle');
        break;
      case 'Sprint':
        history.push('/games/sprint');
        break;
      default:
    }
  };

  const updateLevel = (level:number) => {
    setCurrentGroup(level);
    setLevel(level);
  };

  const selectedGame = (selectedGame:string) => (selectedGame === game ? '#0077b6ff' : 'rgba(0, 118, 182, 0.5)');
  const selectedLevel = (selectedLevel:number) => (selectedLevel === level ? '#0077b6ff' : 'rgba(0, 118, 182, 0.5)');

  return (
    <div className="choose-game-wrapper">
      <h2>Выберите игру и уровень сложности.</h2>
      <div className="select-game">
        <button type="button" style={{ backgroundColor: `${selectedGame('MakeWord')}` }} className="game-link" onClick={() => setGame('MakeWord')}>Собери слово</button>
        <button type="button" style={{ backgroundColor: `${selectedGame('Savanna')}` }} className="game-link" onClick={() => setGame('Savanna')}>Саванна</button>
        <button type="button" style={{ backgroundColor: `${selectedGame('AudioBattle')}` }} className="game-link" onClick={() => setGame('AudioBattle')}>Аудиовызов</button>
        <button type="button" style={{ backgroundColor: `${selectedGame('Sprint')}` }} className="game-link" onClick={() => setGame('Sprint')}>Спринт</button>
      </div>
      <div className="select-difficulty">
        <button type="button" style={{ backgroundColor: `${selectedLevel(0)}` }} className="game-link" onClick={() => updateLevel(0)}>1</button>
        <button type="button" style={{ backgroundColor: `${selectedLevel(1)}` }} className="game-link" onClick={() => updateLevel(1)}>2</button>
        <button type="button" style={{ backgroundColor: `${selectedLevel(2)}` }} className="game-link" onClick={() => updateLevel(2)}>3</button>
        <button type="button" style={{ backgroundColor: `${selectedLevel(3)}` }} className="game-link" onClick={() => updateLevel(3)}>4</button>
        <button type="button" style={{ backgroundColor: `${selectedLevel(4)}` }} className="game-link" onClick={() => updateLevel(4)}>5</button>
        <button type="button" style={{ backgroundColor: `${selectedLevel(5)}` }} className="game-link" onClick={() => updateLevel(5)}>6</button>
      </div>
      <button type="button" className="game-link" onClick={() => startGameHandler()}>старт</button>
    </div>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  group: state.words.currentGroup,
});

export default connect(mapStateToProps, { setCurrentGroup })(ChooseGame);

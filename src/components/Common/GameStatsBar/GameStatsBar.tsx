import React from 'react';
import exitFullScreenIcon from '../../../assets/icons/exit-fullscreen.png';
import fullScreenIcon from '../../../assets/icons/fullscreen.png';

type PropsType = {
  correctWords: number,
  maxCorrectInARow: number,
  errors: number,
  handleEnter(): void,
  handleExit(): void,
  handleActive: boolean
};

const GameStatsBar:React.FC<PropsType> = ({
  correctWords, maxCorrectInARow, errors, handleActive, handleExit, handleEnter,
}: PropsType) => (
  <div className="game-stats-wrapper">
    <span>
      Верно:
      {correctWords}
    </span>
    <span>
      Серия правильных:
      {maxCorrectInARow}
    </span>
    <span>
      Неверно:
      {errors}
    </span>
    <span>
      Всего слов:
      {correctWords + errors}
    </span>
    <button className="fullscreen-btn" type="button" onClick={() => (handleActive ? handleExit() : handleEnter())}><img src={handleActive ? exitFullScreenIcon : fullScreenIcon} alt="fullscreen" /></button>
  </div>
);

export default GameStatsBar;

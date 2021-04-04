/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { AppStateType } from '../../../redux/store';
import { getWordsForGame } from '../../../redux/make-word-reducer';
import WordInfo from './WordInfo';
import WordRandomLetters from './WordRandomLetters';
import fullScreenIcon from '../../../assets/icons/fullscreen.png';
import exitFullScreenIcon from '../../../assets/icons/exit-fullscreen.png';

type MapStateToPropsType = {
  words: any,
};

type MapDispatchToPropsType = {
  getWordsForGame: (page: number, group: number) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MakeWordGame:React.FC<PropsType> = ({ words, getWordsForGame }: PropsType) => {
  const [isRunnug, setIsRunning] = useState<boolean>(false);
  const [correctInARow, setCorrectInARow] = useState<number>(0);
  const [maxCorrectInARow, setMaxCorrectInARow] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [clickedLetter, setClickedLetter] = useState<string>('');
  const [clickedTime, setClickedTime] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState<number>(0);

  const handle = useFullScreenHandle();

  const NextWordHandler = () => {
    setWordIndex((prev) => prev + 1);
    const element = document.getElementById('word-info-wrapper');
    if (element) {
      element.style.backgroundColor = '#caf0f8ff';
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= activeLetterIndex; i++) {
      const element = document.getElementById(`input${i}`);
      if (element) {
        element.style.fontSize = '0px';
        element.style.transform = 'scale(1)';
        element.style.border = '3px solid rgb(110, 110, 110)';
      }
    }
    setActiveLetterIndex(0);
  };

  const InputHandler = (letter: string) => {
    if (words.length === wordIndex + 1) {
      setGameOver(true);
    }
    if (words[wordIndex].word.length === activeLetterIndex + 1
      && words[wordIndex].word[activeLetterIndex] === letter) {
      const element = document.getElementById('word-info-wrapper');
      if (element) {
        element.style.backgroundColor = '#70e000';
      }
      setCorrectWords(correctWords + 1);
      setCorrectInARow(correctInARow + 1);
      setTimeout(() => NextWordHandler(), 700);
    }
    if (words[wordIndex].word[activeLetterIndex] === letter) {
      setActiveLetterIndex((prev) => prev + 1);
      const element = document.getElementById(`input${activeLetterIndex}`);
      if (element) {
        element.style.fontSize = '25px';
        element.style.transform = 'scale(1.05)';
        element.style.border = '3px solid green';
      }
    } else {
      const element = document.getElementById('word-info-wrapper');
      setErrors(errors + 1);
      setCorrectInARow(0);
      if (element) {
        element.style.backgroundColor = 'rgba(255, 100, 100)';
      }
      setTimeout(() => NextWordHandler(), 700);
    }
  };

  const startGameHandler = () => {
    setIsRunning(true);
    setWordIndex(0);
    setGameOver(false);
    setErrors(0);
    setCorrectWords(0);
  };

  const onKeypress = (e: any) => {
    setClickedLetter(e.key);
    setClickedTime(e.timeStamp);
  };

  useEffect(() => {
    if (clickedLetter !== '') {
      InputHandler(clickedLetter);
    }
  }, [clickedTime]);

  useEffect(() => {
    getWordsForGame(0, 0);

    document.addEventListener('keypress', onKeypress);

    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, []);

  useEffect(() => {
    if (maxCorrectInARow < correctInARow) {
      setMaxCorrectInARow(correctInARow);
    }
  }, [correctInARow]);

  const wrapperStyles = ['make-words-wrapper'];

  if (handle.active) {
    wrapperStyles.push('fullscreen-wrapper');
  }

  return isRunnug && words.length > wordIndex
    ? (
      <FullScreen handle={handle}>
        <div className={wrapperStyles.join(' ')}>
          <div className="game-stats-wrapper">
            <span>
              Correctly:
              {correctWords}
            </span>
            <span>
              Correct in a row:
              {maxCorrectInARow}
            </span>
            <span>
              Error:
              {errors}
            </span>
            <span>
              Total:
              {correctWords + errors}
            </span>
            <button className="fullscreen-btn" type="button" onClick={() => (handle.active ? handle.exit() : handle.enter())}><img src={handle.active ? exitFullScreenIcon : fullScreenIcon} alt="fullscreen" /></button>
          </div>
          {words.length > wordIndex ? <WordInfo word={words[wordIndex]} /> : 'the end'}
          <div className="word-letters">
            <WordRandomLetters
              inputHandler={(letter: string) => InputHandler(letter)}
              word={words[wordIndex].word}
              clickedLetter={clickedLetter}
              clickedTime={clickedTime}
            />
          </div>
        </div>
      </FullScreen>

    )
    : (
      <FullScreen handle={handle}>
        <div className="make-words-wrapper">
          <div className="make-words-description">В этой игре вам предстоит собрать перевод слова, используя предоставленные буквы</div>
          <div className="make-words-description">{gameOver ? `Игра окончена! Правильных слов: ${correctWords}, лучшая серия правильных ответов: ${maxCorrectInARow}, ошибок: ${errors}, всего слов: ${correctWords + errors}` : ''}</div>
          <div className="make-words-description">
            <button className="start-game-btn" type="button" onClick={startGameHandler}>{gameOver ? 'Начать новую игру' : 'Начать игру'}</button>
          </div>
        </div>
      </FullScreen>

    );
};

const mapStateToProps = (state: AppStateType) => ({
  words: state.makeWordsGame.words,
});

export default connect(mapStateToProps, { getWordsForGame })(MakeWordGame);

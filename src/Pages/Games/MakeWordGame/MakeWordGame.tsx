/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { getWordsForGame } from '../../../redux/make-word-reducer';
import WordInfo from './WordInfo';
import WordRandomLetters from './WordRandomLetters';

type MapStateToPropsType = {
  words: any,
};

type MapDispatchToPropsType = {
  getWordsForGame: (page: number, group: number) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MakeWordGame:React.FC<PropsType> = ({ words, getWordsForGame }: PropsType) => {
  const [isRunnug, setIsRunning] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [activeLetterIndex, setActiveLetterIndex] = useState<number>(0);

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
      if (element) {
        element.style.backgroundColor = 'rgba(255, 100, 100)';
      }
      setTimeout(() => NextWordHandler(), 700);
    }
  };
  console.log(words);

  const startGameHandler = () => {
    setIsRunning(true);
    setWordIndex(0);
    setGameOver(false);
    setErrors(0);
    setCorrectWords(0);
  };

  useEffect(() => {
    getWordsForGame(0, 0);
  }, []);

  return isRunnug && words.length > wordIndex
    ? (
      <div className="make-words-wrapper">
        <div className="game-stats-wrapper">
          <span>
            Correctly:
            {correctWords}
          </span>
          <span>
            Error:
            {errors}
          </span>
          <span>
            Total:
            {correctWords + errors}
          </span>
        </div>
        {words.length > wordIndex ? <WordInfo word={words[wordIndex]} /> : 'the end'}
        <div className="word-letters">
          <WordRandomLetters
            inputHandler={(letter: string) => InputHandler(letter)}
            word={words[wordIndex].word}
          />
        </div>
      </div>
    )
    : (
      <div className="make-words-wrapper">
        <div className="make-words-description">В этой игре вам предстоит собрать перевод слова, используя предоставленные буквы</div>
        <div className="make-words-description">{gameOver ? 'Игра окончена!' : ''}</div>
        <div className="make-words-description">
          <button className="start-game-btn" type="button" onClick={startGameHandler}>{gameOver ? 'Начать новую игру' : 'Начать игру'}</button>
        </div>
      </div>
    );
};

const mapStateToProps = (state: AppStateType) => ({
  words: state.makeWordsGame.words,
});

export default connect(mapStateToProps, { getWordsForGame })(MakeWordGame);

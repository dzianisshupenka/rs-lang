/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { AppStateType } from '../../redux/store';
import { getWordsForGame } from '../../redux/make-word-reducer';
import WordInfo from './WordInfo';
import WordRandomLetters from './WordRandomLetters';
import GameStatsBar from '../Common/GameStatsBar/GameStatsBar';
import ListOfPlayedWords from '../Common/Games/EndGameStatistic/ListOfPlayedWords';

type MapStateToPropsType = {
  words: any,
  group: number,
  page: number,
};

type MapDispatchToPropsType = {
  getWordsForGame: (page: number, group: number) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MakeWordGame:React.FC<PropsType> = ({
  words, getWordsForGame, group, page,
}: PropsType) => {
  const [isRunnug, setIsRunning] = useState<boolean>(false);
  const [correctInARow, setCorrectInARow] = useState<number>(0);
  const [maxCorrectInARow, setMaxCorrectInARow] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [clickedLetter, setClickedLetter] = useState<string>('');
  const [clickedTime, setClickedTime] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<any[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);
  const [wordsForStats, setWordsForStats] = useState<any[]>([]);
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
      setCorrectWords([...correctWords, words[wordIndex]]);
      const wordForStats = words[wordIndex];
      wordForStats.answerResult = true;
      setWordsForStats([...wordsForStats, wordForStats]);
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
      const wordForStats = words[wordIndex];
      wordForStats.answerResult = false;
      setWordsForStats([...wordsForStats, wordForStats]);
      setWrongAnswers([...wrongAnswers, words[wordIndex]]);
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
    setWrongAnswers([]);
    setCorrectWords([]);
    setWordsForStats([]);
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
    getWordsForGame(page, group);

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
          <GameStatsBar
            correctWords={correctWords.length}
            errors={wrongAnswers.length}
            maxCorrectInARow={maxCorrectInARow}
            handleActive={handle.active}
            handleEnter={() => handle.enter()}
            handleExit={() => handle.exit()}
          />
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
        <div className={wrapperStyles.join(' ')}>
          <div className="make-words-description">{gameOver ? '' : '?? ???????? ???????? ?????? ?????????????????? ?????????????? ?????????????? ??????????, ?????????????????? ?????????????????????????????? ??????????'}</div>
          <div className="make-words-description">{gameOver ? <ListOfPlayedWords listOfPlayedWords={wordsForStats} /> : ''}</div>
          <div className="make-words-description">
            <button className="start-game-btn" type="button" onClick={startGameHandler}>{gameOver ? '???????????? ?????????? ????????' : '???????????? ????????'}</button>
          </div>
        </div>
      </FullScreen>
    );
};

const mapStateToProps = (state: AppStateType) => ({
  words: state.makeWordsGame.words,
  group: state.words.currentGroup,
  page: state.words.currentPage,
});

export default connect(mapStateToProps, { getWordsForGame })(MakeWordGame);

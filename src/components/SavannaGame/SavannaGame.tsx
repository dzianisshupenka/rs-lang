import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { AppStateType } from '../../redux/store';
import { getWordsForGame } from '../../redux/make-word-reducer';
import bcg1 from '../../assets/images/savanna-backgrounds/Untitled-1.png';
import bcg2 from '../../assets/images/savanna-backgrounds/Untitled-2.png';
import bcg3 from '../../assets/images/savanna-backgrounds/Untitled-3.png';
import bcg4 from '../../assets/images/savanna-backgrounds/Untitled-4.png';
import bcg5 from '../../assets/images/savanna-backgrounds/Untitled-5.png';
import bcg6 from '../../assets/images/savanna-backgrounds/Untitled-6.png';
import diam from '../../assets/icons/diamond.png';
import Preloader from '../Common/Preloader/Preloader';
import Lifes from './Lifes';
import GameStatsBar from '../Common/GameStatsBar/GameStatsBar';
import ListOfPlayedWords from '../Common/Games/EndGameStatistic/ListOfPlayedWords';

type MapStateToPropsType = {
  words: any,
  group: number,
  page: number
};

type MapDispatchToPropsType = {
  getWordsForGame: (page: number, group: number) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const SavannaGame:React.FC<PropsType> = ({
  words, group, page, getWordsForGame,
}: PropsType) => {
  const [x1, setX1] = useState(0);
  const [x2, setX2] = useState(0);
  const [x3, setX3] = useState(0);
  const [x4, setX4] = useState(0);
  const [x5, setX5] = useState(0);
  const [x6, setX6] = useState(0);
  const [top, setTop] = useState(-80);
  const [width, setWidth] = useState(300);
  const [wordInd, setWordInd] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [border, setBorder] = useState(0);
  const [borderColor, setBorderColor] = useState('red');
  const [answers, setAnswers] = useState<string[]>([]);
  const [lifes, setLifes] = useState([1, 2, 3, 4, 5]);
  const [gameOver, setGameOver] = useState(false);
  const [correctWords, setCorrectWords] = useState<any[]>([]);
  const [wrongAnswers, setWrongAnswers] = useState<any[]>([]);
  const [wordsForStats, setWordsForStats] = useState<any[]>([]);
  const [correctInARow, setCorrectInARow] = useState<number>(0);
  const [maxCorrectInARow, setMaxCorrectInARow] = useState<number>(0);
  const [height, setHeight] = useState(500);
  const [isRunnug, setIsRunning] = useState(false);
  const [timer, setTimer] = useState(0);

  const handle = useFullScreenHandle();

  const MoveDecor = (x: number) => {
    if (x > 120) {
      return x - 15;
    }
    if (x < -120) {
      return x + 15;
    }
    return x + Math.round(Math.random() * 15) - 7;
  };

  const newWord = (item: string) => {
    if (item === words[wordInd].wordTranslate) {
      setBorderColor('green');
    } else {
      setBorderColor('red');
    }
    setTimeout(() => {
      setBorder(6);
    }, 200);
    setWidth(0);
    setSpeed(5);
  };

  const move = () => {
    setX1(MoveDecor(x1));
    setX2(MoveDecor(x2));
    setX3(MoveDecor(x3));
    setX4(MoveDecor(x4));
    setX5(MoveDecor(x5));
    setX6(MoveDecor(x6));
  };

  if (top >= (height - 70)) {
    if (borderColor === 'red') {
      const newLifes = lifes;
      newLifes.pop();
      setLifes(newLifes);
      setWrongAnswers([...wrongAnswers, words[wordInd]]);
      const wordForStats = words[wordInd];
      wordForStats.answerResult = false;
      setWordsForStats([...wordsForStats, wordForStats]);
      setCorrectInARow(0);
    } else if (borderColor === 'green') {
      setCorrectWords([...correctWords, words[wordInd]]);
      const wordForStats = words[wordInd];
      wordForStats.answerResult = true;
      setWordsForStats([...wordsForStats, wordForStats]);
      setCorrectInARow((prev) => prev + 1);
    }
    if (lifes.length === 0) {
      setGameOver(true);
      setIsRunning(false);
    }
    if (wordInd === words.length - 1) {
      setGameOver(true);
      setIsRunning(false);
    }

    setTop(-80);
    setWidth(300);
    setSpeed(0);
    setBorderColor('red');
    setTimeout(() => {
      setBorder(0);
    }, 200);
    setWordInd(wordInd + 1);
    move();
  }

  useEffect(() => {
    if (handle.active) {
      setHeight(window.innerHeight);
    } else {
      setHeight(500);
    }
  }, [handle.active]);

  useEffect(() => {
    if (speed > 0 && top < height) {
      setTop((prev) => prev + speed);
    }
  }, [timer]);

  useEffect(() => {
    getWordsForGame(page, group);
    setWordInd(0);
    const timer = isRunnug ? setInterval(() => {
      setTop((prev) => prev + 1);
      setTimer((prev) => prev + 1);
    }, 15) : null;
    if (gameOver && timer) {
      clearInterval(timer);
    }
    return () => (timer ? clearInterval(timer) : setGameOver(false));
  }, [gameOver, isRunnug]);

  const getAnswers = () => {
    if (words.length) {
      const answ = [words[wordInd].wordTranslate];
      // eslint-disable-next-line no-plusplus
      while (answ.length < 4) {
        const newAnswer = words[Math.floor(Math.random() * 20)].wordTranslate;
        if (!answ.includes(newAnswer)) {
          answ.push(newAnswer);
        }
        if (answ.length === 4) {
          setAnswers(answ.sort(() => Math.random() - 0.5));
        }
      }
    }
  };

  const startGameHandler = () => {
    setIsRunning(true);
    setGameOver(false);
    setCorrectWords([]);
    setWrongAnswers([]);
    setCorrectInARow(0);
    setLifes([1, 2, 3, 4, 5]);
  };

  useEffect(() => {
    if (wordInd < words.length) {
      getAnswers();
    }
  }, [wordInd, words]);

  useEffect(() => {
    if (maxCorrectInARow < correctInARow) {
      setMaxCorrectInARow(correctInARow);
    }
  }, [correctInARow]);

  const savanaStyles = ['savanna-wrapper'];
  const gameContentStyles = ['game-content'];

  if (handle.active) {
    savanaStyles.push('savanna-wrapper-fullscreen');
    gameContentStyles.push('game-content-fullscreen');
  }

  const imgHeight = handle.active ? '110vh' : '600px';
  const imgWidth = handle.active ? '110vw' : '800px';

  return (
    <FullScreen handle={handle}>
      <div id="game-container" className={savanaStyles.join(' ')}>
        {words.length ? (
          <>
            <img
              style={{
                height: `${imgHeight}`, width: `${imgWidth}`, zIndex: 3, transform: `translateX(${x1}px)`,
              }}
              src={bcg1}
              alt="bcg1"
            />
            <img
              style={{
                height: `${imgHeight}`, width: `${imgWidth}`, zIndex: 3, transform: `translateX(${x2}px)`,
              }}
              src={bcg2}
              alt="bcg2"
            />
            <img
              style={{
                height: `${imgHeight}`, width: `${imgWidth}`, zIndex: 3, transform: `translateX(${x3}px)`,
              }}
              src={bcg3}
              alt="bcg3"
            />
            <img
              style={{
                height: `${imgHeight}`, width: `${imgWidth}`, zIndex: 2, transform: `translateX(${x4}px)`,
              }}
              src={bcg4}
              alt="bcg4"
            />
            <img
              style={{
                height: `${imgHeight}`, width: `${imgWidth}`, zIndex: 1, transform: `translateX(${x5}px)`,
              }}
              src={bcg5}
              alt="bcg5"
            />
            <img
              style={{
                height: `${imgHeight}`, width: `${imgWidth}`, zIndex: 1, transform: `translateX(${x6}px)`,
              }}
              src={bcg6}
              alt="bcg6"
            />
            { isRunnug ? (
              <div className={gameContentStyles.join(' ')}>
                <GameStatsBar
                  errors={wrongAnswers.length}
                  correctWords={correctWords.length}
                  maxCorrectInARow={maxCorrectInARow}
                  handleActive={handle.active}
                  handleExit={() => handle.exit()}
                  handleEnter={() => handle.enter()}
                />
                <Lifes height={handle.active ? 100 : 50} lifes={lifes} />
                <div
                  style={{
                    top: `${top}px`,
                    width: `${width}px`,
                    borderRight: `${border}px solid ${borderColor}`,
                  }}
                  className="active-word"
                >
                  {words.length && wordInd < words.length ? words[wordInd].word : 'loading'}
                </div>
                <div className="savanna-answers">
                  {answers.length
                    ? answers.map((item:string) => <button type="button" onClick={() => newWord(item)} className="answer-word">{item}</button>)
                    : 'loading...'}
                </div>
                <div className="words-catcher">
                  <span>
                    {correctWords.length}
                  </span>
                  <img src={diam} alt="diam" />
                </div>
              </div>
            ) : (
              <div className="savanna-welcome-bye" style={{ zIndex: 8 }}>
                {gameOver
                  ? (
                    <div className="make-words-description">
                      {gameOver ? <ListOfPlayedWords listOfPlayedWords={wordsForStats} /> : ''}
                    </div>
                  )
                  : <div className="make-words-description">{gameOver ? '' : 'В этой игре вам предстоит собрать перевод слова, используя предоставленные буквы'}</div>}
                <div className="make-words-description">
                  <button className="start-game-btn" type="button" onClick={startGameHandler}>{gameOver ? 'Начать новую игру' : 'Начать игру'}</button>
                </div>
              </div>
            )}
          </>
        )
          : <Preloader />}
      </div>
    </FullScreen>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  words: state.makeWordsGame.words,
  group: state.words.currentGroup,
  page: state.words.currentPage,
});

export default connect(mapStateToProps, { getWordsForGame })(SavannaGame);

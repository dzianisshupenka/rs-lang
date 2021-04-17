/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './SprintGame.css';

import React, {
  useEffect, useRef, useState, useCallback,
} from 'react';

import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { connect } from 'react-redux';
import fullScreenIcon from '../../assets/icons/fullscreen.png';
import exitFullScreenIcon from '../../assets/icons/exit-fullscreen.png';
import { AppStateType } from '../../redux/store';
import CustomButton from '../Common/Games/CustomButton';
import AnswerButtons from '../Common/Games/AnswerButton';
import ListOfPlayedWords from '../Common/Games/EndGameStatistic/ListOfPlayedWords';

import {
  playAudio,
  getRandomPlayableWordObjectSprint,
  insertNewCounterOfRightAnswers,
  // getNumOfRightAnswers,
  // getNumOfWrongAnswers,
  // getNumOfPlayedWords,
  // getMaxRightAnswersInARow,
  // getNumOfSkippedWords,
  getArrayLastIndex,
  getNewListOfWordsSprint,
} from '../Common/Games/CommonFuncs';

import { AnswerButtonProps, SprintWordForRound } from '../Common/Games/Types';

import {
  ANSWERRESULTSTYLES,
  AUDIOBATTLE_FULLSCREEN,
  AUDIOBATTLE,
  GAMESTATUS,
  INFO,
  REPEATAUDIO_SMALL,
  GameStatus,
  REPEATAUDIO_BIG,
  WORD,
  CONTROLBUTTON_DEFAULT,
  CONTROLBUTTON_ENDGAME,
  GAME_RULES_SPRINT,
} from '../Common/Games/Const';

type Props = {
  page: number;
  group: number;
};

const SprintGame = ({ page, group }: Props) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.loading);
  const [listOfWords, setListOfWords] = useState<SprintWordForRound[]>([]);
  const [
    CurrentPlayedWord,
    setCurrentPlayedWord,
  ] = useState<SprintWordForRound>({
    id: '',
    group: -1,
    page: -1,
    word: '',
    wordTranslate: '',
    image: '',
    audio: '',
    alredyPlayed: false,
    answerResult: false,
    visibleAnswer: '',
  });

  const [score, setScore] = useState<number>(0);
  const [scoreSpeed, setScoreSpeed] = useState<number>(10);
  const [timer, setTimer] = useState(60);

  const currentPage = useRef(page);
  const correctAnswersInARow = useRef([0]);
  const timeCounterInterval = useRef<number>();

  const handle = useFullScreenHandle();

  useEffect(() => {
    (async () => {
      const newListOfWords = await getNewListOfWordsSprint(page, group);
      setListOfWords((curListOfWords) => [
        ...curListOfWords,
        ...newListOfWords,
      ]);
      setGameStatus(GameStatus.ready);
    })();

    return clearInterval(timeCounterInterval.current);
  }, []);

  useEffect(() => {
    if (!timer) {
      clearInterval(timeCounterInterval.current);
      setGameStatus(GameStatus.finished);
    }
  }, [timer]);

  const setNextWordHandler = async (listOfWords: SprintWordForRound[]) => {
    const newWord:
    | SprintWordForRound
    | undefined = getRandomPlayableWordObjectSprint(listOfWords);
    if (!newWord) {
      if (currentPage.current > 0) {
        setGameStatus(GameStatus.loading);
        currentPage.current -= 1;
        const newListOfWords = await getNewListOfWordsSprint(
          currentPage.current,
          group,
        );
        setListOfWords((curListOfWords) => [
          ...curListOfWords,
          ...newListOfWords,
        ]);

        setNextWordHandler(newListOfWords);
        setGameStatus(GameStatus.inProcess);
      } else {
        setGameStatus(GameStatus.finished);
      }
    } else {
      setCurrentPlayedWord(newWord);
    }
  };
  const answerButtonHandler = useCallback(
    async (e: any) => {
      let userResult: boolean | undefined;
      switch (e.type) {
        case 'click': {
          userResult = e.target.innerText === 'Верно';
          break;
        }
        case 'keyup': {
          if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { userResult = e.key === 'ArrowRight'; }
          break;
        }
        default: break;
      }

      CurrentPlayedWord.alredyPlayed = true;
      if (userResult === (CurrentPlayedWord?.wordTranslate === CurrentPlayedWord?.visibleAnswer)) {
        CurrentPlayedWord.answerResult = true;
        correctAnswersInARow.current[
          getArrayLastIndex(correctAnswersInARow.current)
        ] += 1;
        setScore((currentScore) => currentScore + scoreSpeed);
        if (scoreSpeed !== 80) {
          const lastCorrectAnswersInARow: number = correctAnswersInARow.current[getArrayLastIndex(correctAnswersInARow.current)];
          const newScoreSpeed = 10 * (2 ** Math.floor(lastCorrectAnswersInARow / 3));
          setScoreSpeed(
            newScoreSpeed,
          );
        }
      } else {
        CurrentPlayedWord.answerResult = false;
        correctAnswersInARow.current = insertNewCounterOfRightAnswers(
          correctAnswersInARow.current,
        );
        setScoreSpeed(10);
      }

      setCurrentPlayedWord({ ...CurrentPlayedWord });

      await setNextWordHandler(listOfWords);
    }, [CurrentPlayedWord],
  );
  useEffect(() => {
    if (gameStatus === GameStatus.inProcess) {
      timeCounterInterval.current = window.setInterval(() => setTimer((currentTimer) => currentTimer - 1), 1000);
    }

    return () => {
      clearInterval(timeCounterInterval.current);
    };
  }, [gameStatus]);

  useEffect(() => {
    window.addEventListener('keyup', answerButtonHandler);

    return () => {
      window.removeEventListener('keyup', answerButtonHandler);
    };
  }, [answerButtonHandler]);

  const startGameHandler = (listOfWords: SprintWordForRound[]) => {
    setGameStatus(GameStatus.inProcess);
    setNextWordHandler(listOfWords);
  };

  return (
    <FullScreen handle={handle}>
      <div className={AUDIOBATTLE}>

        <img
          src={handle.active ? exitFullScreenIcon : fullScreenIcon}
          alt="fullscreen"
          className={AUDIOBATTLE_FULLSCREEN}
          onClick={() => (handle.active ? handle.exit() : handle.enter())}
        />

        <h2 className={GAMESTATUS}>{gameStatus}</h2>

        {gameStatus === GameStatus.loading && <div className="preloader" />}

        {gameStatus === GameStatus.ready && (
        <>
          <h2 className={INFO}>{GAME_RULES_SPRINT}</h2>
          <CustomButton
            value="Начать игру"
            className={CONTROLBUTTON_DEFAULT}
            onClickHandler={() => startGameHandler(listOfWords)}
          />
        </>
        )}

        {gameStatus === GameStatus.inProcess && (
        <>
          <CustomButton
            value="Завершить"
            className={CONTROLBUTTON_ENDGAME}
            onClickHandler={() => setGameStatus(GameStatus.finished)}
          />
          <div className={INFO}>{`${timer}`}</div>
          <div className={INFO}>{`Очки: ${score}`}</div>
          <div className={INFO}>{`+${scoreSpeed} очков за слово`}</div>
          <div className={INFO}>{`Слово: ${CurrentPlayedWord.word}`}</div>
          <div className={INFO}>{`Перевод: ${CurrentPlayedWord.visibleAnswer}`}</div>
          {/* <div className={`answer-marker__${prevAnswerResult}`}></div> */}
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CustomButton onClickHandler={answerButtonHandler} value="Неверно" className={`${CONTROLBUTTON_DEFAULT} isInCorrectButton`} />
              <div className="arrow-left" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CustomButton onClickHandler={answerButtonHandler} value="Верно" className={`${CONTROLBUTTON_DEFAULT} isCorrectButton`} />
              <div className="arrow-right" />
            </div>
          </div>
        </>

        )}

        {gameStatus === GameStatus.finished && (
        <>
          <ListOfPlayedWords
            listOfPlayedWords={listOfWords.filter(
              (wordObj) => wordObj.alredyPlayed === true,
            )}
          />
        </>
        )}

      </div>
    </FullScreen>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  page: state.words.currentPage,
  group: state.words.currentGroup,
});

export default connect(mapStateToProps)(SprintGame);

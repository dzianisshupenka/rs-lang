/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './AudioBatle.css';

import React, { useEffect, useRef, useState } from 'react';

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
  getRandomPlayableWordObject,
  insertNewCounterOfRightAnswers,
  // getNumOfRightAnswers,
  // getNumOfWrongAnswers,
  // getNumOfPlayedWords,
  // getMaxRightAnswersInARow,
  // getNumOfSkippedWords,
  getNewListOfWords,
  getArrayLastIndex,
} from '../Common/Games/CommonFuncs';

import { AnswerButtonProps, AudioBattleWordForRound } from '../Common/Games/Types';

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
  GAME_RULES,
  CONTROLBUTTON_ENDGAME,
} from '../Common/Games/Const';

type Props = {
  page: number;
  group: number;
};

const AudioBatle = ({ page, group }: Props) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.loading);
  const [listOfWords, setListOfWords] = useState<AudioBattleWordForRound[]>([]);
  const [
    CurrentPlayedWord,
    setCurrentPlayedWord,
  ] = useState<AudioBattleWordForRound>({
    id: '',
    group: -1,
    page: -1,
    word: '',
    wordTranslate: '',
    image: '',
    audio: '',
    alredyPlayed: false,
    answerResult: false,
    answers: [],
  });

  const currentPage = useRef(page);
  const correctAnswersInARow = useRef([0]);

  const handle = useFullScreenHandle();

  useEffect(() => {
    (async () => {
      const newListOfWords = await getNewListOfWords(page, group);
      setListOfWords((curListOfWords) => [
        ...curListOfWords,
        ...newListOfWords,
      ]);
      setGameStatus(GameStatus.ready);
    })();
  }, []);

  useEffect(() => {
    if (CurrentPlayedWord?.audio) {
      playAudio(CurrentPlayedWord?.audio);
    }
  }, [CurrentPlayedWord.word]);

  const setNextWordHandler = async (listOfWords: AudioBattleWordForRound[]) => {
    const newWord:
    | AudioBattleWordForRound
    | undefined = getRandomPlayableWordObject(listOfWords);
    if (!newWord) {
      if (currentPage.current > 0) {
        setGameStatus(GameStatus.loading);
        currentPage.current -= 1;
        const newListOfWords = await getNewListOfWords(
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

  const startGameHandler = (listOfWords: AudioBattleWordForRound[]) => {
    setGameStatus(GameStatus.inProcess);
    setNextWordHandler(listOfWords);
  };

  const answerButtonHandler = ({ target: { innerText: answer } }: any) => {
    const answerObj = CurrentPlayedWord.answers.find(
      (answerItem) => answerItem.value === answer,
    ) as AnswerButtonProps;
    CurrentPlayedWord.alredyPlayed = true;
    if (answer === CurrentPlayedWord?.wordTranslate) {
      CurrentPlayedWord.answerResult = true;
      correctAnswersInARow.current[
        getArrayLastIndex(correctAnswersInARow.current)
      ] += 1;
      answerObj.styleClass = ANSWERRESULTSTYLES.ANSWERBUTTON__RIGHT;
    } else {
      CurrentPlayedWord.answerResult = false;
      correctAnswersInARow.current = insertNewCounterOfRightAnswers(
        correctAnswersInARow.current,
      );
      answerObj.styleClass = ANSWERRESULTSTYLES.ANSWERBUTTON__WRONG;
    }
    CurrentPlayedWord.answers = CurrentPlayedWord.answers.map((answerItem) => ({
      value: answerItem.value,
      styleClass:
        answerItem.value !== answer
          ? ANSWERRESULTSTYLES.ANSWERBUTTON__UNAVAILABLE
          : answerItem.styleClass,
      disabled: true,
    }));
    setCurrentPlayedWord({ ...CurrentPlayedWord });
  };

  const skipWordHandler = () => {
    CurrentPlayedWord.alredyPlayed = true;
    correctAnswersInARow.current = insertNewCounterOfRightAnswers(
      correctAnswersInARow.current,
    );
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
        {gameStatus === GameStatus.inProcess && (
        <CustomButton
          value="Завершить"
          className={CONTROLBUTTON_ENDGAME}
          onClickHandler={() => setGameStatus(GameStatus.finished)}
        />
        )}
        <h2 className={GAMESTATUS}>{gameStatus}</h2>
        {gameStatus === GameStatus.loading && <div className="preloader" />}

        {/* [
        {
          name: 'Удачные попытки, %',
          value: Math.round(
            (100 * getNumOfRightAnswers(listOfWords))
              / getNumOfPlayedWords(listOfWords),
          ),
        },
        {
          name: 'Неудачные попытки, %',
          value: Math.round(
            (100 * getNumOfWrongAnswers(listOfWords))
              / getNumOfPlayedWords(listOfWords),
          ),
        },
        {
          name: 'Пропущено слов, %',
          value: Math.round(
            (100 * getNumOfSkippedWords(listOfWords))
              / getNumOfPlayedWords(listOfWords),
          ),
        },
        {
          name: 'Всего слов',
          value: getNumOfPlayedWords(listOfWords),
        },
        {
          name: 'Максимум правильных ответов подряд',
          value: getMaxRightAnswersInARow(correctAnswersInARow.current),
        },
      ] */}

        {gameStatus === GameStatus.finished && (
        <>
          <ListOfPlayedWords
            listOfPlayedWords={listOfWords.filter(
              (wordObj) => wordObj.alredyPlayed === true,
            )}
          />
        </>
        )}

        {gameStatus === GameStatus.inProcess && (
        <>
          <div
            className={
              CurrentPlayedWord.answerResult !== undefined
                ? 'audio-battle__word-prompt_visible'
                : 'audio-battle__word-prompt_hidden'
            }
          >
            <img className={ANSWERRESULTSTYLES.ANSWERBUTTON__WORD_IMAGE} src={CurrentPlayedWord?.image} alt="not loaded" />
            <div className={WORD}>
              <CustomButton
                className={REPEATAUDIO_SMALL}
                onClickHandler={() => playAudio(CurrentPlayedWord?.audio)}
              />
              <h2 className={INFO}>
                {`Word: ${CurrentPlayedWord?.word}` || 'none'}
              </h2>
            </div>
          </div>
        </>
        )}

        {!CurrentPlayedWord.alredyPlayed
        && gameStatus === GameStatus.inProcess && (
          <CustomButton
            className={REPEATAUDIO_BIG}
            onClickHandler={() => playAudio(CurrentPlayedWord?.audio)}
          />
        )}

        {gameStatus === GameStatus.inProcess && (
        <AnswerButtons
          arrOfAnswerButtons={CurrentPlayedWord?.answers as AnswerButtonProps[]}
          answerButtonHandler={answerButtonHandler}
        />
        )}

        {gameStatus === GameStatus.ready && (
        <>
          <h2 className={INFO}>{GAME_RULES}</h2>
          <CustomButton
            value="Начать игру"
            className={CONTROLBUTTON_DEFAULT}
            onClickHandler={() => startGameHandler(listOfWords)}
          />
        </>
        )}

        {gameStatus === GameStatus.inProcess
        && CurrentPlayedWord.alredyPlayed
        && CurrentPlayedWord.word && (
          <CustomButton
            value="Следующее слово"
            className={CONTROLBUTTON_DEFAULT}
            onClickHandler={() => setNextWordHandler(listOfWords)}
          />
        )}

        {gameStatus === GameStatus.inProcess
        && !CurrentPlayedWord.alredyPlayed
        && CurrentPlayedWord.word && (
          <CustomButton
            value="Пропустить слово"
            className={CONTROLBUTTON_DEFAULT}
            onClickHandler={() => skipWordHandler()}
          />
        )}
      </div>
    </FullScreen>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  page: state.words.currentPage,
  group: state.words.currentGroup,
});

export default connect(mapStateToProps)(AudioBatle);

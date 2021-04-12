/* eslint-disable @typescript-eslint/no-unused-vars */
import './AudioBatle.css';

import React, { useEffect, useRef, useState } from 'react';

import CustomButton from './CustomButton';
import AnswerButtons from './AnswerButton';
import StatTable from '../Common/EndGameStatistic/StatTable';
import ListOfPlayedWords from './ListOfPlayedWords';

import {
  playAudio,
  getRandomPlayableWordObject,
  insertNewCounterOfRightAnswers,
  getNumOfRightAnswers,
  getNumOfWrongAnswers,
  getNumOfPlayedWords,
  getMaxRightAnswersInARow,
  getNumOfSkippedWords,
  getNewListOfWords,
  getArrayLastIndex,
} from './CommonFuncs';

import { AnswerButtonProps, AudioBattleWordForRound } from './Types';

import {
  ANSWERRESULTSTYLES,
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
} from './Const';

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
    word: '',
    wordTranslate: '',
    image: '',
    audio: '',
    alredyPlayed: false,
    answerResult: false,
    answers: [],
  });
  const [showGameResult, setShowGameResult] = useState(true);

  const currentPage = useRef(page);
  const correctAnswersInARow = useRef([0]);

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

  const setShowGameResultHandler = () => {
    setShowGameResult((curren) => !curren);
  };

  return (
    <div className={AUDIOBATTLE}>
      {gameStatus === GameStatus.inProcess && (
        <CustomButton
          value="Завершить"
          className={CONTROLBUTTON_ENDGAME}
          onClickHandler={() => setGameStatus(GameStatus.finished)}
        />
      )}
      <h2 className={GAMESTATUS}>{gameStatus}</h2>
      {gameStatus === GameStatus.loading && <div className="preloader" />}
      {gameStatus === GameStatus.finished && showGameResult && (
        <>
          <StatTable
            arrayOfData={[
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
            ]}
          />
        </>
      )}

      {gameStatus === GameStatus.finished && !showGameResult && (
        <>
          <ListOfPlayedWords
            listOfPlayedWords={listOfWords.filter(
              (wordObj) => wordObj.alredyPlayed === true,
            )}
          />
        </>
      )}

      {gameStatus === GameStatus.finished && (
        <CustomButton
          value={showGameResult ? 'Показать слова' : 'показать статистику'}
          className={CONTROLBUTTON_DEFAULT}
          onClickHandler={() => setShowGameResultHandler()}
        />
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
            <img src={CurrentPlayedWord?.image} alt="not loaded" />
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
  );
};

export default AudioBatle;

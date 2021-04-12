/* eslint-disable import/prefer-default-export */
import wordsAPI from '../../../api/words';
import { AnswerButtonProps, AudioBattleWordForRound } from './Types';
import {
  ANSWERRESULTSTYLES,
  NUMBER_OF_WRONG_WORDS,
} from './Const';
import { BACKEND_ROUTE } from '../../../api/Const';

const playAudio = (audioPath: string) => {
  if (audioPath) {
    const audioElement = new Audio(audioPath);
    audioElement.currentTime = 0;
    audioElement.oncanplaythrough = audioElement.play;
  }
};

const getRandomPlayableWordObject = (
  listOfWords: AudioBattleWordForRound[],
): AudioBattleWordForRound | undefined => listOfWords.find(
  (wordObject: AudioBattleWordForRound) => wordObject.alredyPlayed === false,
);

const getRandomNumber = (maxValue: number) => Math.floor(Math.random() * maxValue);

const mixArray = (array: any[]) => {
  const arrayForMix = [...array];
  const mixedArray = [];
  while (arrayForMix.length) {
    const [element] = arrayForMix.splice(
      getRandomNumber(arrayForMix.length),
      1,
    );
    mixedArray.push(element);
  }
  return mixedArray;
};

const getArrOfAnswers = (
  rightAnswer: string,
  rawListOfWords: any,
): AnswerButtonProps[] => {
  const arrForSearch = rawListOfWords.filter(
    (rawWordObj: any) => rawWordObj.wordTranslate !== rightAnswer,
  );
  const arrOfAns = Array.from(
    { length: NUMBER_OF_WRONG_WORDS },
    (): AnswerButtonProps => ({
      value: arrForSearch.splice(getRandomNumber(arrForSearch.length), 1)[0]
        .wordTranslate,
      styleClass: ANSWERRESULTSTYLES.ANSWERBUTTON__DEFAULT,
      disabled: false,
    }),
  );
  const arrayOfMixedAnswers = mixArray([
    ...arrOfAns,
    {
      value: rightAnswer,
      styleClass: ANSWERRESULTSTYLES.ANSWERBUTTON__DEFAULT,
      disabled: false,
    },
  ]);
  return arrayOfMixedAnswers;
};

const getPlayableListOfWords = (
  rawListOfWords: any,
): AudioBattleWordForRound[] => rawListOfWords
  .map((rawWordObject: any, _: number, mappedArray: any[]) => {
    const {
      word, wordTranslate, image, audio,
    } = rawWordObject;
    const answers: AnswerButtonProps[] = getArrOfAnswers(
      wordTranslate,
      mappedArray,
    );

    return {
      word,
      wordTranslate,
      image: `${BACKEND_ROUTE}/${image}`,
      audio: `${BACKEND_ROUTE}/${audio}`,
      alredyPlayed: false,
      answerResult: undefined,
      answers,
    };
  });

const getNewListOfWords = async (
  page: number,
  group: number,
): Promise<AudioBattleWordForRound[]> => {
  const rawListOfWords = await wordsAPI.getWords(page, group);
  const newListOfWords = getPlayableListOfWords(rawListOfWords);
  return newListOfWords;
};

const getArrayLastIndex = (arr: any) => (arr.length ? arr.length - 1 : arr.length);

const insertNewCounterOfRightAnswers = (array: any) => (array[getArrayLastIndex(array)]
  ? [...array, 0] : [...array]);

const getNumOfRightAnswers = (listOfWords: AudioBattleWordForRound[]) => listOfWords
  .filter((wordItem: AudioBattleWordForRound) => wordItem.answerResult === true)
  .length;

const getNumOfWrongAnswers = (listOfWords: AudioBattleWordForRound[]) => listOfWords
  .filter((wordItem: AudioBattleWordForRound) => wordItem.answerResult === false)
  .length;

const getNumOfPlayedWords = (listOfWords: AudioBattleWordForRound[]) => listOfWords
  .filter((wordItem: AudioBattleWordForRound) => wordItem.alredyPlayed === true)
  .length;

const getMaxRightAnswersInARow = (correctAnswersInARow: any) => [...correctAnswersInARow]
  .sort((a, b) => a - b)[
    getArrayLastIndex(correctAnswersInARow)
  ];

const getNumOfSkippedWords = (listOfWords: AudioBattleWordForRound[]) => listOfWords
  .filter((wordItem: AudioBattleWordForRound) => (wordItem.alredyPlayed === true
      && wordItem.answerResult === undefined))
  .length;
export {
  playAudio,
  getRandomPlayableWordObject,
  getRandomNumber,
  mixArray,
  getArrOfAnswers,
  getPlayableListOfWords,
  insertNewCounterOfRightAnswers,
  getNumOfRightAnswers,
  getNumOfWrongAnswers,
  getNumOfPlayedWords,
  getMaxRightAnswersInARow,
  getNumOfSkippedWords,
  getNewListOfWords,
  getArrayLastIndex,
};

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { playAudio } from '../CommonFuncs';
import './listOfPlayedWords.css';
import CustomButton from '../CustomButton';
import {
  REPEATAUDIO_LIST,
  LISTOFPLAYEDWORDS,
  LISTOFPLAYEDWORDS_GROUP,
  LISTOFPLAYEDWORDS_SUBLIST_ANSWERED,
  LISTOFPLAYEDWORDS_SUBLIST_UNANSWERED,
  LISTOFPLAYEDWORDS_LISTITEM,
  LISTOFPLAYEDWORDS_WORD,
  LISTOFPLAYEDWORDS_WORDTRANSLATE,
} from '../Const';
import { EndGameStatisticElement } from '../Types';
import store from '../../../../redux/store';
import { setCurrentPage, setCurrentGroup, setCurrentWordID } from '../../../../redux/words-reducer';

type Props = {
  listOfPlayedWords: EndGameStatisticElement[];
};

enum PlayedWordsGroupType {
  answered = 'answered',
  unanswered = 'unanswered',
}

const setWordGlobalInfo = (page: number, group: number, wordId: string) => {
  store.dispatch(setCurrentPage(page));
  store.dispatch(setCurrentGroup(group));
  store.dispatch(setCurrentWordID(wordId));
  localStorage.setItem('currentPage', String(page));
  localStorage.setItem('currentGroup', String(group));
};

const groppedList = (
  groupOfWords: EndGameStatisticElement[],
  groupType: PlayedWordsGroupType,
  changeRoute: Function,
) => (groupOfWords.length
  ? (
    <ul className={LISTOFPLAYEDWORDS_GROUP}>
      <div
        className={
        groupType === PlayedWordsGroupType.answered
          ? LISTOFPLAYEDWORDS_SUBLIST_ANSWERED
          : LISTOFPLAYEDWORDS_SUBLIST_UNANSWERED
      }
        data-words={groupOfWords.length}
      >
        {groupType === PlayedWordsGroupType.answered ? 'Знаю' : 'Ошибок'}

      </div>

      {groupOfWords.map((wordObj: EndGameStatisticElement) => (
        <li key={wordObj.word} className={LISTOFPLAYEDWORDS_LISTITEM}>
          <CustomButton
            className={REPEATAUDIO_LIST}
            onClickHandler={() => playAudio(wordObj.audio)}
          />
          <span
            className={LISTOFPLAYEDWORDS_WORD}
            onClick={() => {
              setWordGlobalInfo(wordObj.page, wordObj.group, wordObj.id);
              changeRoute('/textbook');
            }}
          >
            {`${wordObj.word} `}
          </span>
          <span className={LISTOFPLAYEDWORDS_WORDTRANSLATE}>
            &mdash;
            {` ${wordObj.wordTranslate}`}
          </span>
        </li>
      ))}
    </ul>

  )
  : (
    <></>
  )
);

const ListOfPlayedWords = ({ listOfPlayedWords }: Props) => {
  const history = useHistory();
  return (
    <div className={LISTOFPLAYEDWORDS}>
      <div className={`${LISTOFPLAYEDWORDS}__wrapper`}>
        Результат игры:
        {groppedList(
          listOfPlayedWords.filter((wordsObj) => wordsObj.answerResult === true),
          PlayedWordsGroupType.answered,
          history.push,
        )}
        {groppedList(
          listOfPlayedWords.filter((wordsObj) => wordsObj.answerResult === false),
          PlayedWordsGroupType.unanswered,
          history.push,
        )}
      </div>
    </div>
  );
};

export default ListOfPlayedWords;

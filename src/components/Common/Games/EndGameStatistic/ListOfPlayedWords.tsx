import React from 'react';
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

type Props = {
  listOfPlayedWords: EndGameStatisticElement[];
};

enum PlayedWordsGroupType {
  answered = 'answered',
  unanswered = 'unanswered',
}
const groppedList = (
  groupOfWords: EndGameStatisticElement[],
  groupType: PlayedWordsGroupType,
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
          {/* <a href="/"><span className={LISTOFPLAYEDWORDS_WORD}>{wordObj.word}</span></a> */}
          <span className={LISTOFPLAYEDWORDS_WORD}>
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

// todo ссылки на слова в словаре
const ListOfPlayedWords = ({ listOfPlayedWords }: Props) => (
  <div className={LISTOFPLAYEDWORDS}>
    <div className={`${LISTOFPLAYEDWORDS}__wrapper`}>
      Результат игры:
      {groppedList(
        listOfPlayedWords.filter((wordsObj) => wordsObj.answerResult === true),
        PlayedWordsGroupType.answered,
      )}
      {groppedList(
        listOfPlayedWords.filter((wordsObj) => wordsObj.answerResult === false),
        PlayedWordsGroupType.unanswered,
      )}
    </div>
  </div>
);

export default ListOfPlayedWords;

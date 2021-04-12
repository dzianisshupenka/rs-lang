import React from 'react';
import { playAudio } from '../CommonFuncs';
// import './AudioBatle.css';
import CustomButton from '../CustomButton';
import {
  REPEATAUDIO_LIST,
  LISTOFPLAYEDWORDS,
  LISTOFPLAYEDWORDS_LISTITEM,
  LISTOFPLAYEDWORDS_WORLDTRANSLATE,
} from '../Const';
import { AudioBattleWordForRound } from '../Types';

type Props = {
  listOfPlayedWords:AudioBattleWordForRound[]
};
// todo ссылки на слова в словаре
const ListOfPlayedWords = ({ listOfPlayedWords }: Props) => (
  <div style={{ height: '300px' }}>
    <ul className={LISTOFPLAYEDWORDS}>
      {listOfPlayedWords.map((wordObj:AudioBattleWordForRound) => (
        <li key={wordObj.word} className={LISTOFPLAYEDWORDS_LISTITEM}>
          <CustomButton
            className={REPEATAUDIO_LIST}
            onClickHandler={() => playAudio(wordObj.audio)}
          />
          <a href="/"><span>{wordObj.word}</span></a>
          <span className={LISTOFPLAYEDWORDS_WORLDTRANSLATE}>
            {`- ${wordObj.wordTranslate}`}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default ListOfPlayedWords;

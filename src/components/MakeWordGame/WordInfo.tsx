import React from 'react';
import WordInputLetters from './WordInputLetters';

type PropsType = {
  word: any
};

const WordInfo:React.FC<PropsType> = ({ word } :PropsType) => (
  <div className="word-info-main-wrapper">
    <div id="word-info-wrapper" className="word-info">
      <span>{word.wordTranslate}</span>
      <span>{word.textMeaningTranslate}</span>
      <WordInputLetters word={word.word} />
    </div>
  </div>

);

export default WordInfo;

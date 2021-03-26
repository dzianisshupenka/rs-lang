import React from 'react';

type PropsType = {
  word: string
};

const WordInputLetters:React.FC<PropsType> = ({ word }: PropsType) => (
  <div className="word-letters-wrapper">
    {word.split('').map((item: string, index: number) => <div id={`input${index}`} className="word-inputs-letter-box">{item}</div>)}
  </div>
);

export default WordInputLetters;

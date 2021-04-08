import React from 'react';

type PropsType = {
  word: string
};

const WordInputLetters:React.FC<PropsType> = ({ word }: PropsType) => (
  <div className="word-letters-wrapper">
    {/* eslint-disable-next-line react/no-array-index-key */}
    {word.split('').map((item: string, index: number) => <div key={item + index} id={`input${index}`} className="word-inputs-letter-box">{item}</div>)}
  </div>
);

export default WordInputLetters;

import React from 'react';

type PropsType = {
  word: string
};

const WordRandomLetters:React.FC<PropsType> = ({ word }: PropsType) => (
  <div className="word-letters-wrapper">
    {word.split('').sort(() => Math.random() - 0.5).map((el:any) => <div className="word-letter-box">{el}</div>)}
  </div>
);

export default WordRandomLetters;

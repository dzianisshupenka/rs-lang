import React from 'react';

type PropsType = {
  word: any
};

const WordInfo:React.FC<PropsType> = ({ word } :PropsType) => (
  <div className="word-info">
    {word}
  </div>
);

export default WordInfo;

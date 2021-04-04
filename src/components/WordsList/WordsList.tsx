import React from 'react';
import { v4 as uuid } from 'uuid';
import Word from './Word';

type MapStateToPropsType = {
  wordsList: any,
};

type PropsType = MapStateToPropsType;

const WordsList: React.FC<PropsType> = ({ wordsList }: PropsType) => (
  <div>
    <h2>Список из 20 слов</h2>
    {wordsList && wordsList.map((wordInfo: any) => {
      const id = uuid();
      return (
        <div key={id}>
          <Word wordInfo={wordInfo} />
        </div>
      );
    })}
  </div>
);

export default WordsList;

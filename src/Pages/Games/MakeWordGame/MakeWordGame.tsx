/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { getWordsForGame } from '../../../redux/make-word-reducer';
import WordInfo from './WordInfo';
import WordRandomLetters from './WordRandomLetters';

type MapStateToPropsType = {
  words: any,
};

type MapDispatchToPropsType = {
  getWordsForGame: (page: number, group: number) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MakeWordGame:React.FC<PropsType> = ({ words, getWordsForGame }: PropsType) => {
  const [isRunnug, setIsRunning] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);

  useEffect(() => {
    getWordsForGame(0, 0);
  }, []);
  return isRunnug && words.length > wordIndex
    ? (
      <div className="make-words-wrapper">
        {words.length > wordIndex ? <WordInfo word={words[wordIndex].wordTranslate} /> : 'the end'}
        <button type="button" onClick={() => setWordIndex((prev) => prev + 1)}>next</button>
        <div className="word-letters">
          <WordRandomLetters word={words[wordIndex].word} />
        </div>
      </div>
    )
    : (
      <div className="make-words-wrapper">
        <button className="start-game-btn" type="button" onClick={() => { setIsRunning(true); setWordIndex(0); }}>start</button>
      </div>
    );
};

const mapStateToProps = (state: AppStateType) => ({
  words: state.makeWordsGame.words,
});

export default connect(mapStateToProps, { getWordsForGame })(MakeWordGame);

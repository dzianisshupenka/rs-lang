/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { getCurrentWord } from '../../../redux/words-reducer';
import WordDescription from './WordDescription';

type MapStateToPropsType = {
  currentWordID: string,
  currentWordInfo: any,
  wordImage: any,
  wordAudio: any,
  wordAudioMeaning: any,
  wordAudioExample: any,
};

type MapDispatchToPropsType = {
  getCurrentWord: (id: string) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const WordDescriptionContainer: React.FC<PropsType> = ({
  currentWordID,
  currentWordInfo,
  wordImage,
  wordAudio,
  wordAudioMeaning,
  wordAudioExample,
  getCurrentWord,
}: PropsType) => {
  useEffect(() => {
    getCurrentWord(currentWordID);
  }, [currentWordID]);

  return (
    <div>
      <WordDescription
        currentWordInfo={currentWordInfo}
        wordImage={wordImage}
        wordAudio={wordAudio}
        wordAudioMeaning={wordAudioMeaning}
        wordAudioExample={wordAudioExample}
      />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currentWordID: state.words.currentWordID,
  currentWordInfo: state.words.currentWordInfo,
  wordImage: state.words.wordImage,
  wordAudio: state.words.wordAudio,
  wordAudioMeaning: state.words.wordAudioMeaning,
  wordAudioExample: state.words.wordAudioExample,
});

export default connect(mapStateToProps, { getCurrentWord })(WordDescriptionContainer);

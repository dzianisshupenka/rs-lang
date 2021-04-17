import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import WordsList from './WordsList';

type MapStateToPropsType = {
  currentWordID: string,
  wordsList: any,
  deletedWordsId: Array<String>,
};

type OwnProps = {
};

type PropsType = MapStateToPropsType & OwnProps;

const WordsListContainer: React.FC<PropsType> = ({
  wordsList,
  currentWordID,
  deletedWordsId,
}: PropsType) => (
  <WordsList
    wordsList={wordsList}
    currentWordID={currentWordID}
    deletedWordsId={deletedWordsId}
  />
);

const MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  deletedWordsId: state.dictionary.deletedWordsId,
  currentWordID: state.words.currentWordID,
  wordsList: state.words.words,
});

export default connect(MapStateToProps, {})(WordsListContainer);

import React from 'react';
import { v4 as uuid } from 'uuid';
import { connect } from 'react-redux';
import WordListItem from './WordListItem';
import styles from './WordList.module.css';
import { AppStateType } from '../../../redux/store';

type MapStateToPropsType = {
  currentWordID: string,
};

type OwnProps = {
  wordsList: any,
};

type PropsType = MapStateToPropsType & OwnProps;

const WordsList: React.FC<PropsType> = ({ wordsList, currentWordID }: PropsType) => (
  <div className={styles.wordsList}>
    {wordsList && wordsList.map((wordInfo: any) => {
      const id = uuid();
      const isActive = wordInfo.id === currentWordID;
      return (
        <div key={id} className={isActive ? styles.active : ''}>
          <WordListItem wordInfo={wordInfo} />
        </div>
      );
    })}
  </div>
);

const MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currentWordID: state.words.currentWordID,
});

export default connect(MapStateToProps, {})(WordsList);

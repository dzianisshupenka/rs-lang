import React from 'react';
import { connect } from 'react-redux';
import styles from './WordList.module.css';
import { setCurrentWordID, SetCurrentWordIDType } from '../../../redux/words-reducer';

type OwnProps = {
  wordInfo: any,
};

type MapDispatchToProps = {
  setCurrentWordID: (id: string) => SetCurrentWordIDType,
};

type PropsType = OwnProps & MapDispatchToProps;

const WordListItem: React.FC<PropsType> = ({ wordInfo, setCurrentWordID }: PropsType) => {
  const { word, wordTranslate, id } = wordInfo;

  return (
    <div
      role="menuitem"
      aria-hidden="true"
      className={styles.wordListItem}
      onClick={() => setCurrentWordID(id)}
    >
      <div className={styles.word}>{word}</div>
      <div className={styles.translation}>{wordTranslate}</div>
    </div>
  );
};

export default connect(null, { setCurrentWordID })(WordListItem);

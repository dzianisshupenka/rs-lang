import React from 'react';
import WordListItem from './WordListItem';
import styles from './WordList.module.css';

type OwnProps = {
  wordsList: any,
  currentWordID: string,
  deletedWordsId: Array<String>,
};

type PropsType = OwnProps;

const WordsList: React.FC<PropsType> = ({
  wordsList,
  currentWordID,
  deletedWordsId,
}: PropsType) => {
  const wordsListElements = wordsList
    && wordsList
      .filter((word: any) => !deletedWordsId.includes(word.id))
      .map((wordInfo: any) => {
        const isActive = wordInfo.id === currentWordID;
        return (
          <div key={wordInfo.id} className={isActive ? styles.active : ''}>
            <WordListItem wordInfo={wordInfo} />
          </div>
        );
      });

  return (
    <div className={styles.wordsList}>
      { wordsListElements}
    </div>
  );
};

export default WordsList;

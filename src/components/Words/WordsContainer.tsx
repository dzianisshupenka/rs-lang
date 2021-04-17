/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { NavLink } from 'react-router-dom';
import { AppStateType } from '../../redux/store';
import WordsList from './WordList/WordsList';
import { getWordsList, setCurrentGroup, setCurrentPage } from '../../redux/words-reducer';
import styles from './Words.module.css';
import WordDescriptionContainer from './WordDescription/WordDescriptionContainer';
import TextbookSettings from './TextbookSettings/TextbookSettings';

type MapStateToPropsType = {
  wordsList: any,
  groupsCount: number,
  currentPage: number,
  currentGroup: number,
};

type MapDispatchToPropsType = {
  getWordsList: (page: number, group: number) => Promise<void>,
  setCurrentGroup: (currentGroup: number) => void,
  setCurrentPage: (page: number) => void,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const WordsContainer: React.FC<PropsType> = ({
  wordsList,
  groupsCount,
  currentPage,
  currentGroup,
  getWordsList,
  setCurrentGroup,
  setCurrentPage,
}: PropsType) => {
  const groupTitles = new Array(groupsCount).fill(0).map((elem, index) => `Раздел ${index + 1}`);
  const groupTitlesElements = groupTitles.map((title, index) => {
    const group = index;
    const isCurrentGroup = group === currentGroup;
    const id = uuid();
    return (
      <span key={id}>
        <button
          type="button"
          onClick={() => setCurrentGroup(group)}
          className={`${isCurrentGroup ? styles.selectedGroup : ''} group${index + 1}`}
        >
          {title}
        </button>
      </span>
    );
  });

  useEffect(() => {
    getWordsList(currentPage, currentGroup);

    if (currentPage !== 0) {
      localStorage.setItem('currentPage', `${currentPage}`);
    }

    if (currentGroup !== 0) {
      localStorage.setItem('currentGroup', `${currentGroup}`);
    }
  }, [currentPage, currentGroup]);

  useEffect(() => {
    const currentPage = localStorage.getItem('currentPage');
    const currentGroup = localStorage.getItem('currentGroup');

    if (currentPage) {
      setCurrentPage(Number(currentPage));
    }

    if (currentGroup) {
      setCurrentGroup(Number(currentGroup));
    }
  }, []);

  return (
    <div className={styles.wordsContainer}>
      <div className={styles.groups}>
        {groupTitlesElements}
      </div>
      <div className={styles.words}>
        <WordDescriptionContainer />
        <WordsList wordsList={wordsList} />
        <div className={styles.games}>
          <TextbookSettings />
          <p>Повтори слова в играх:</p>
          <NavLink className="game-link" to="/games/make-word">Make Words</NavLink>
          <NavLink className="game-link" to="/games/savanna">Savanna</NavLink>
          <NavLink className="game-link" to="/games/audio-battle">Audio battle</NavLink>
          <NavLink className="game-link" to="/games/sprint">Sprint</NavLink>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  wordsList: state.words.words,
  groupsCount: state.words.groupsCount,
  currentGroup: state.words.currentGroup,
  currentPage: state.words.currentPage,
});

export default connect(mapStateToProps, {
  getWordsList, setCurrentGroup, setCurrentPage,
})(WordsContainer);

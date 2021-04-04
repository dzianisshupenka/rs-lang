/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { AppStateType } from '../../redux/store';
import WordsList from './WordsList';
import { getWordsList, setCurrentPage, setCurrentGroup } from '../../redux/wordsList-reducer';
import styles from './WordList.module.css';

type MapStateToPropsType = {
  wordsList: any,
  wordsInGroupCount: number,
  groupsCount: number,
  pageSize: number,
  currentPage: number,
  currentGroup: number,
};

type MapDispatchToPropsType = {
  getWordsList: (page: number, group: number) => Promise<void>,
  setCurrentPage: (currentPage: number) => void,
  setCurrentGroup: (currentGroup: number) => void,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const WordsListContainer: React.FC<PropsType> = ({
  wordsList, wordsInGroupCount, groupsCount,
  pageSize, currentPage, currentGroup,
  getWordsList, setCurrentPage, setCurrentGroup,
}: PropsType) => {
  const pagesCount = wordsInGroupCount / pageSize;
  const pageIndexes = new Array(pagesCount).fill(0).map((elem, index) => index + 1);

  const pageIndexElements = pageIndexes.map((pageIndex) => {
    const isCurrentPage = pageIndex === currentPage + 1;
    const id = uuid();
    return (
      <span key={id}>
        <button
          type="button"
          onClick={() => setCurrentPage(pageIndex - 1)}
          className={isCurrentPage ? styles.selectedPage : ''}
        >
          {pageIndex}
        </button>
      </span>
    );
  });

  const groupTitles = new Array(groupsCount).fill(0).map((elem, index) => `Group ${index + 1}`);
  const groupTitlesElements = groupTitles.map((title, index) => {
    const group = index + 1;
    const isCurrentGroup = group === currentGroup;
    const id = uuid();
    return (
      <span key={id}>
        <button
          type="button"
          onClick={() => setCurrentGroup(group)}
          className={isCurrentGroup ? styles.selectedGroup : ''}
        >
          {title}
        </button>
      </span>
    );
  });

  useEffect(() => {
    getWordsList(currentPage, currentGroup);
  }, [currentPage, currentGroup]);

  return (
    <div>
      <div>
        {groupTitlesElements}
      </div>
      <div>
        {pageIndexElements}
      </div>
      <WordsList wordsList={wordsList} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  wordsList: state.words.words,
  wordsInGroupCount: state.words.wordsInGroupCount,
  groupsCount: state.words.groupsCount,
  pageSize: state.words.pageSize,
  currentPage: state.words.currentPage,
  currentGroup: state.words.currentGroup,
});

export default connect(mapStateToProps, {
  getWordsList, setCurrentPage, setCurrentGroup,
})(WordsListContainer);

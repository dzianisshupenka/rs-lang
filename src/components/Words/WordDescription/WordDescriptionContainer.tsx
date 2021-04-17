/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import { getCurrentWord, setCurrentPage } from '../../../redux/words-reducer';
import Pagination from '../../Common/Pagination/Pagination';
import WordDescription from './WordDescription';
import {
  addHardWordId, addDeletedWordId, AddHardWordIdType, AddDeletedWordIdType,
} from '../../../redux/dictionary-reducer';

type MapStateToPropsType = {
  currentWordID: string,
  currentWordInfo: any,
  wordImage: any,
  wordAudio: any,
  wordAudioMeaning: any,
  wordAudioExample: any,
  wordsInGroupCount: number,
  pageSize: number,
  currentPage: number,
  isTranslationShown: boolean,
  hardWordsId: Array<String>,
};

type MapDispatchToPropsType = {
  getCurrentWord: (id: string) => Promise<void>,
  setCurrentPage: (page: number) => void,
  addHardWordId: (wordId: string) => AddHardWordIdType,
  addDeletedWordId: (wordId: string) => AddDeletedWordIdType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const WordDescriptionContainer: React.FC<PropsType> = ({
  hardWordsId,
  currentWordID,
  currentWordInfo,
  wordImage,
  wordAudio,
  wordAudioMeaning,
  wordAudioExample,
  wordsInGroupCount,
  pageSize,
  currentPage,
  isTranslationShown,
  getCurrentWord,
  setCurrentPage,
  addHardWordId,
  addDeletedWordId,
}: PropsType) => {
  useEffect(() => {
    getCurrentWord(currentWordID);
  }, [currentWordID]);

  return (
    <div>
      <WordDescription
        hardWordsId={hardWordsId}
        currentWordInfo={currentWordInfo}
        wordImage={wordImage}
        wordAudio={wordAudio}
        wordAudioMeaning={wordAudioMeaning}
        wordAudioExample={wordAudioExample}
        isTranslationShown={isTranslationShown}
        addHardWordId={addHardWordId}
        addDeletedWordId={addDeletedWordId}
      />
      <Pagination
        totalItemsCount={wordsInGroupCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={setCurrentPage}
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
  wordsInGroupCount: state.words.wordsInGroupCount,
  pageSize: state.words.pageSize,
  currentPage: state.words.currentPage,
  isTranslationShown: state.textbookSettings.isTranslationShown,
  hardWordsId: state.dictionary.hardWordsId,
});

export default connect(
  mapStateToProps,
  {
    getCurrentWord, setCurrentPage, addHardWordId, addDeletedWordId,
  },
)(WordDescriptionContainer);

import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import filesAPI from '../api/files';
import wordsAPI from '../api/words';
import { AppStateType } from './store';

const SET_WORDS_LIST = 'rs-lang/words/SET_WORDS_LIST';
const SET_CURRENT_PAGE = 'rs-lang/words/SET_CURRENT_PAGE';
const SET_CURRENT_GROUP = 'rs-lang/words/SET_CURRENT_GROUP';
const SET_CURRENT_WORD_ID = 'rs-lang/words/SET_CURRENT_WORD_ID';
const SET_CURRENT_WORD_INFO = 'rs-lang/words/SET_CURRENT_WORD_INFO';
const SET_WORD_IMAGE = 'rs-lang/words/SET_WORD_IMAGE';
const SET_WORD_AUDIO = 'rs-lang/words/SET_WORD_AUDIO';
const SET_WORD_AUDIO_MEANING = 'rs-lang/words/SET_WORD_AUDIO_MEANING';
const SET_WORD_AUDIO_EXAMPLE = 'rs-lang/words/SET_WORD_AUDIO_EXAMPLE';

const InitialState = {
  currentWordID: '',
  currentWordInfo: null as any,
  wordImage: null as any,
  wordAudio: null as any,
  wordAudioMeaning: null as any,
  wordAudioExample: null as any,

  words: null as any,
  currentPage: 0,
  pageSize: 20,
  groupsCount: 6,
  currentGroup: 0,
  wordsInGroupCount: 600,
};

type InitialStateType = typeof InitialState;

type ActionsType =
  | SetWordsType
  | SetCurrentPageType
  | SetCurrentGroupType
  | SetCurrentWordInfoType
  | SetWordImageType
  | SetWordAudioType
  | SetWordAudioMeaningType
  | SetWordAudioExampleType
  | SetCurrentWordIDType
;

const wordsListReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_WORDS_LIST:
      return {
        ...state,
        words: action.words,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_CURRENT_GROUP:
      return {
        ...state,
        currentGroup: action.currentGroup,
      };
    case SET_CURRENT_WORD_INFO:
      return {
        ...state,
        currentWordInfo: action.currentWordInfo,
      };
    case SET_WORD_IMAGE:
      return {
        ...state,
        wordImage: action.wordImage,
      };
    case SET_WORD_AUDIO:
      return {
        ...state,
        wordAudio: action.wordAudio,
      };
    case SET_WORD_AUDIO_MEANING:
      return {
        ...state,
        wordAudioMeaning: action.wordAudioMeaning,
      };
    case SET_WORD_AUDIO_EXAMPLE:
      return {
        ...state,
        wordAudioExample: action.wordAudioExample,
      };
    case SET_CURRENT_WORD_ID:
      return {
        ...state,
        currentWordID: action.currentWordID,
      };
    default:
      return state;
  }
};

export type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE,
  currentPage: number,
};

export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

export type SetCurrentGroupType = {
  type: typeof SET_CURRENT_GROUP,
  currentGroup: number,
};

export const setCurrentGroup = (currentGroup: number): SetCurrentGroupType => ({
  type: SET_CURRENT_GROUP,
  currentGroup,
});

export type SetWordsType = {
  type: typeof SET_WORDS_LIST,
  words: any,
};

export const setWords = (data: any): SetWordsType => ({
  type: SET_WORDS_LIST,
  words: data,
});

export type SetCurrentWordInfoType = {
  type: typeof SET_CURRENT_WORD_INFO,
  currentWordInfo: any,
};

export const setCurrentWordInfo = (wordInfo: any): SetCurrentWordInfoType => ({
  type: SET_CURRENT_WORD_INFO,
  currentWordInfo: wordInfo,
});

export type SetWordImageType = {
  type: typeof SET_WORD_IMAGE,
  wordImage: any,
};

export const setWordImage = (image: any): SetWordImageType => ({
  type: SET_WORD_IMAGE,
  wordImage: image,
});

export type SetWordAudioType = {
  type: typeof SET_WORD_AUDIO,
  wordAudio: any,
};

export const setWordAudio = (audio: any): SetWordAudioType => ({
  type: SET_WORD_AUDIO,
  wordAudio: audio,
});

export type SetWordAudioMeaningType = {
  type: typeof SET_WORD_AUDIO_MEANING,
  wordAudioMeaning: any,
};

export const setWordAudioMeaning = (audioMeaning: any): SetWordAudioMeaningType => ({
  type: SET_WORD_AUDIO_MEANING,
  wordAudioMeaning: audioMeaning,
});

export type SetWordAudioExampleType = {
  type: typeof SET_WORD_AUDIO_EXAMPLE,
  wordAudioExample: any,
};

export const setWordAudioExample = (audioExample: any): SetWordAudioExampleType => ({
  type: SET_WORD_AUDIO_EXAMPLE,
  wordAudioExample: audioExample,
});

export type SetCurrentWordIDType = {
  type: typeof SET_CURRENT_WORD_ID,
  currentWordID: string,
};

export const setCurrentWordID = (id: string): SetCurrentWordIDType => ({
  type: SET_CURRENT_WORD_ID,
  currentWordID: id,
});

type DispatchType = Dispatch <ActionsType>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getWordsList = (page: number, group: number): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await wordsAPI.getWords(page, group);
  dispatch(setWords(data));

  const { id } = data[0];
  dispatch(setCurrentWordID(id));
};

export const getCurrentWord = (id: string): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const wordInfo = await wordsAPI.getCurrentWord(id);
  dispatch(setCurrentWordInfo(wordInfo));

  const {
    image: imageFileName,
    audio: audioFileName,
    audioMeaning: audioMeaningFileName,
    audioExample: audioExampleFileName,
  } = wordInfo;

  const wordImage = await filesAPI.getFile(imageFileName);
  dispatch(setWordImage(wordImage));

  const wordAudio = await filesAPI.getFile(audioFileName);
  dispatch(setWordAudio(wordAudio));

  const wordAudioMeaning = await filesAPI.getFile(audioMeaningFileName);
  dispatch(setWordAudioMeaning(wordAudioMeaning));

  const wordAudioExample = await filesAPI.getFile(audioExampleFileName);
  dispatch(setWordAudioExample(wordAudioExample));
};

export default wordsListReducer;

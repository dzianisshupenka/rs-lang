import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import wordsAPI from '../api/words';
import { AppStateType } from './store';

const SET_WORDS_LIST = 'rs-lang/wordsList/SET_WORDS_LIST';
const SET_CURRENT_PAGE = 'rs-lang/wordsList/SET_CURRENT_PAGE';
const SET_CURRENT_GROUP = 'rs-lang/wordsList/SET_CURRENT_GROUP';

const InitialState = {
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
  | SetCurrentGroupType;

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

type DispatchType = Dispatch <ActionsType>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getWordsList = (page: number, group: number): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await wordsAPI.getWords(page, group);
  dispatch(setWords(data));
};

export default wordsListReducer;

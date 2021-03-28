import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import wordsAPI from '../api/words';
import { AppStateType } from './store';

const MAKE_WORD_REDUCER = 'rs-lang/MAKE_WORD_REDUCER';

const InitialState = {
  words: [],
};

type InitialStateType = typeof InitialState;

type ActionsType = MakeWordsDataType;

const makeWordsGameReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case MAKE_WORD_REDUCER:
      return {
        ...state,
        words: action.words,
      };
    default:
      return state;
  }
};

type MakeWordsDataType = {
  type: typeof MAKE_WORD_REDUCER,
  words: any,
};

export const MakeWordsActionCreator = (data: any): MakeWordsDataType => ({
  type: MAKE_WORD_REDUCER,
  words: data,
});

type DispatchType = Dispatch <ActionsType>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getWordsForGame = (page: number, group: number): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await wordsAPI.getWords(page, group);
  dispatch(MakeWordsActionCreator(data));
};

export default makeWordsGameReducer;

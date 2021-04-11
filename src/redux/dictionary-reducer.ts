const ADD_STUDIED_WORD_ID = 'rs-lang/dictionary/ADD_STUDIED_WORD_ID';
const ADD_HARD_WORD_ID = 'rs-lang/dictionary/ADD_HARD_WORD_ID';
const ADD_DELETED_WORD_ID = 'rs-lang/dictionary/ADD_DELETED_WORD_ID';

const InitialState = {
  studiedWordsId: [] as Array<String>,
  hardWordsId: [] as Array<String>,
  deletedWordsId: [] as Array<String>,
};

type InitialStateType = typeof InitialState;

type ActionsType =
  | AddStudiedWordIdType
  | AddHardWordIdType
  | AddDeletedWordIdType
;

const dictionaryReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case ADD_STUDIED_WORD_ID:
      return {
        ...state,
        studiedWordsId: [...state.studiedWordsId, action.wordId],
      };
    case ADD_HARD_WORD_ID:
      return {
        ...state,
        hardWordsId: [...state.hardWordsId, action.wordId],
      };
    case ADD_DELETED_WORD_ID:
      return {
        ...state,
        deletedWordsId: [...state.deletedWordsId, action.wordId],
      };
    default:
      return state;
  }
};

export type AddStudiedWordIdType = {
  type: typeof ADD_STUDIED_WORD_ID,
  wordId: string,
};

export const addStudiedIdWord = (wordId: string): AddStudiedWordIdType => ({
  type: ADD_STUDIED_WORD_ID,
  wordId,
});

export type AddHardWordIdType = {
  type: typeof ADD_HARD_WORD_ID,
  wordId: string,
};

export const addHardWordId = (wordId: string): AddHardWordIdType => ({
  type: ADD_HARD_WORD_ID,
  wordId,
});

export type AddDeletedWordIdType = {
  type: typeof ADD_DELETED_WORD_ID,
  wordId: string,
};

export const addDeletedWordId = (wordId: string): AddDeletedWordIdType => ({
  type: ADD_DELETED_WORD_ID,
  wordId,
});

export default dictionaryReducer;

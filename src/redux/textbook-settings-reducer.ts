const SET_IS_TRANSLATION_SHOWN = 'rs-lang/words/SET_IS_TRANSLATION_SHOWN';
const SET_IS_HARD_WORDS_BTN_SHOWN = 'rs-lang/words/SET_IS_HARD_WORDS_BTN_SHOWN';
const SET_IS_DELETE_WORD_BTN_SHOWN = 'rs-lang/words/SET_IS_DELETE_WORD_BTN_SHOWN';

const InitialState = {
  isTranslationShown: true,
  isHardWordsBtnShown: true,
  isDeleteWordBtnShown: true,
};

type InitialStateType = typeof InitialState;

type ActionsType =
  | SetIsTranslationShownType
  | SetIsHardWordsBtnShownType
  | SetIsDeleteWordBtnShownType
;

const textbookSettingsReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_IS_TRANSLATION_SHOWN:
      return {
        ...state,
        isTranslationShown: action.isTranslationShown,
      };
    case SET_IS_HARD_WORDS_BTN_SHOWN:
      return {
        ...state,
        isHardWordsBtnShown: action.isHardWordsBtnShown,
      };
    case SET_IS_DELETE_WORD_BTN_SHOWN:
      return {
        ...state,
        isDeleteWordBtnShown: action.isDeleteWordBtnShown,
      };
    default:
      return state;
  }
};

export type SetIsTranslationShownType = {
  type: typeof SET_IS_TRANSLATION_SHOWN,
  isTranslationShown: boolean,
};

export const setIsTranslationShown = (isTranslationShown: boolean): SetIsTranslationShownType => ({
  type: SET_IS_TRANSLATION_SHOWN,
  isTranslationShown,
});

export type SetIsHardWordsBtnShownType = {
  type: typeof SET_IS_HARD_WORDS_BTN_SHOWN,
  isHardWordsBtnShown: boolean,
};

export const setIsHardWordsBtnShown = (
  isHardWordsBtnShown: boolean,
): SetIsHardWordsBtnShownType => ({
  type: SET_IS_HARD_WORDS_BTN_SHOWN,
  isHardWordsBtnShown,
});

export type SetIsDeleteWordBtnShownType = {
  type: typeof SET_IS_DELETE_WORD_BTN_SHOWN,
  isDeleteWordBtnShown: boolean,
};

export const setIsDeleteWordBtnShown = (
  isDeleteWordBtnShown: boolean,
): SetIsDeleteWordBtnShownType => ({
  type: SET_IS_DELETE_WORD_BTN_SHOWN,
  isDeleteWordBtnShown,
});

export default textbookSettingsReducer;

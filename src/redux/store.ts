import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import appReducer from './app-reducer';
import makeWordsGameReducer from './make-word-reducer';
import wordsListReducer from './words-reducer';
import { UserStateReduser } from './user-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  makeWordsGame: makeWordsGameReducer,
  words: wordsListReducer,
  user: UserStateReduser,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export default store;

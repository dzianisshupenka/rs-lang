import {
  applyMiddleware, combineReducers, compose, createStore,
} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import appReducer from './app-reducer';
import makeWordsGameReducer from './make-word-reducer';
import wordsListReducer from './wordsList-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  makeWordsGame: makeWordsGameReducer,
  words: wordsListReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;

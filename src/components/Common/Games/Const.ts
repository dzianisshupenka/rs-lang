const AUDIOBATTLE = 'audio-battle';
const GAMESTATUS = `${AUDIOBATTLE}__game-status`;
const INFO = `${AUDIOBATTLE}__info`;
const WORD = `${AUDIOBATTLE}__word`;
const REPEATAUDIO_SMALL = `${AUDIOBATTLE}__repeat-audio_small`;
const REPEATAUDIO_BIG = `${AUDIOBATTLE}__repeat-audio_big`;
const REPEATAUDIO_LIST = `${AUDIOBATTLE}__repeat-audio-list`;
const CONTROLBUTTON_DEFAULT = `${AUDIOBATTLE}__control-button_default`;
const CONTROLBUTTON_ENDGAME = `${AUDIOBATTLE}__control-button_end-game`;

const ANSWERRESULTSTYLES = {
  ANSWERSCONTAINER: `${AUDIOBATTLE}__answers-container`,
  ANSWERBUTTON__DEFAULT: `${AUDIOBATTLE}__answer-button_default`,
  ANSWERBUTTON__WRONG: `${AUDIOBATTLE}__answer-button_wrong`,
  ANSWERBUTTON__UNAVAILABLE: `${AUDIOBATTLE}__answer-button_unavailable`,
  ANSWERBUTTON__RIGHT: `${AUDIOBATTLE}__answer-button_right`,
};

const LISTOFPLAYEDWORDS = 'ListOfPlayedWords';
const LISTOFPLAYEDWORDS_GROUP = `${LISTOFPLAYEDWORDS}__group`;
const LISTOFPLAYEDWORDS_SUBLIST_ANSWERED = `${LISTOFPLAYEDWORDS}__sublist-answered`;
const LISTOFPLAYEDWORDS_SUBLIST_UNANSWERED = `${LISTOFPLAYEDWORDS}__sublist-unanswered`;
const LISTOFPLAYEDWORDS_LISTITEM = `${LISTOFPLAYEDWORDS}__list-item`;
const LISTOFPLAYEDWORDS_WORD = `${LISTOFPLAYEDWORDS}__word`;
const LISTOFPLAYEDWORDS_WORDTRANSLATE = `${LISTOFPLAYEDWORDS}__word-translate`;

const NUMBER_OF_WRONG_WORDS: number = 4;

enum GameStatus {
  loading = 'Загрузка...',
  ready = 'Игра загружена!',
  inProcess = 'Игра запущена',
  finished = 'Игра завершена',
}

const GAME_RULES = 'В этой игре Вам необходиму выбрать правильный перевод озвученного слова. Клик по иконке громофона воспроизводит слово повторно.';
export {
  AUDIOBATTLE,
  ANSWERRESULTSTYLES,
  NUMBER_OF_WRONG_WORDS,
  GAMESTATUS,
  INFO,
  REPEATAUDIO_SMALL,
  REPEATAUDIO_BIG,
  WORD,
  GameStatus,
  CONTROLBUTTON_DEFAULT,
  GAME_RULES,
  REPEATAUDIO_LIST,
  LISTOFPLAYEDWORDS,
  LISTOFPLAYEDWORDS_GROUP,
  LISTOFPLAYEDWORDS_SUBLIST_ANSWERED,
  LISTOFPLAYEDWORDS_SUBLIST_UNANSWERED,
  LISTOFPLAYEDWORDS_LISTITEM,
  LISTOFPLAYEDWORDS_WORD,
  LISTOFPLAYEDWORDS_WORDTRANSLATE,
  CONTROLBUTTON_ENDGAME,
};

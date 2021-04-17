type AnswerButtonProps = {
  value: string;
  styleClass: string;
  disabled: boolean;
};

type AudioBattleWordForRound = {
  id: string;
  group: number;
  page: number;
  word: string;
  wordTranslate: string;
  image: string;
  audio:string;
  alredyPlayed: boolean;
  answerResult: boolean;
  answers: AnswerButtonProps[];
};

type SprintWordForRound = {
  id: string;
  group: number;
  page: number;
  word: string;
  wordTranslate: string;
  image: string;
  audio:string;
  alredyPlayed: boolean;
  answerResult: boolean;
  visibleAnswer: string;
};

type ButtonProps = {
  disabled?: boolean;
  keyVal?: string;
  dataNumber?:number;
  onClickHandler?: Function;
  className?: string;
  value?: string;
};

type EndGameStatisticElement = {
  id: string;
  group: number;
  page: number;
  word: string;
  wordTranslate: string;
  audio: string;
  answerResult: boolean;
};
// eslint-disable-next-line import/prefer-default-export
export type {
  AnswerButtonProps,
  AudioBattleWordForRound,
  ButtonProps,
  EndGameStatisticElement,
  SprintWordForRound,
};

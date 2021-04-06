type AnswerButtonProps = {
  value: string;
  styleClass: string;
  disabled: boolean;
};

type AudioBattleWordForRound = {
  word: string;
  wordTranslate: string;
  image: string;
  audio:string;
  alredyPlayed: boolean;
  answerResult: boolean;
  answers: AnswerButtonProps[];
};

type ButtonProps = {
  disabled?: boolean;
  keyVal?: string;
  dataNumber?:number;
  onClickHandler?: Function;
  className?: string;
  value?: string;
};
// eslint-disable-next-line import/prefer-default-export
export type { AnswerButtonProps, AudioBattleWordForRound, ButtonProps };

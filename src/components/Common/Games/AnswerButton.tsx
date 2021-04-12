import React, { FC } from 'react';
import { AnswerButtonProps } from './Types';
import { ANSWERRESULTSTYLES } from './Const';
import CustomButton from './CustomButton';

type Props = {
  arrOfAnswerButtons: AnswerButtonProps[];
  answerButtonHandler: Function;
};

const AnswerButtons: FC<Props> = ({
  arrOfAnswerButtons,
  answerButtonHandler,
}: Props) => (
  <div className={ANSWERRESULTSTYLES.ANSWERSCONTAINER}>
    {arrOfAnswerButtons.map((answer, index) => (
      <CustomButton
        disabled={answer.disabled}
        key={answer.value}
        className={answer.styleClass}
        dataNumber={index + 1}
        onClickHandler={answerButtonHandler}
        value={answer.value}
      />
    ))}
  </div>
);

export default AnswerButtons;

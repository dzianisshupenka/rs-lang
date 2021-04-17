import React, { FC } from 'react';
import { ButtonProps } from './Types';

const CustomButton: FC<ButtonProps> = ({
  disabled = false,
  keyVal = '',
  dataNumber,
  onClickHandler = () => {},
  className = '',
  value = '',
}: ButtonProps) => (
  <button
    type="button"
    disabled={disabled}
    key={keyVal}
    className={className}
    data-number={dataNumber}
    onClick={(event) => onClickHandler(event)}
  >
    {value}
  </button>
);

export default CustomButton;

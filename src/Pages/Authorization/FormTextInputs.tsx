import React from 'react';
import AuthTextInput from './AuthTypes';

type Props = {
  arrOfTextInputs: AuthTextInput[];
};

const FormTextInputs = ({ arrOfTextInputs }: Props) => (
  <>
    {arrOfTextInputs.map((inputElementProps) => (
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label className="TextInputLabel" key={inputElementProps.name}>
        {inputElementProps.name}
        <input
          type={inputElementProps.type}
          placeholder={inputElementProps.placeholder}
          autoComplete="off"
          name={inputElementProps.name}
          required={inputElementProps.required}
          minLength={inputElementProps.minLength}
        />
      </label>
    ))}
  </>
);

export default FormTextInputs;

import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';
import { useTypedSelector } from '../../redux/store';
import { QueryStatuses } from '../../redux/user-reducer';

type Props = {
  children: ReactNode;
  formName: string;
  submitHAndler: Function;
};

const AuthForm = ({ children, formName, submitHAndler }: Props) => {
  const { queryStatus, isLoged } = useTypedSelector((store) => store.user);
  let message = '';
  if (queryStatus === QueryStatuses.none) {
    message = 'Enter authorization data';
  }
  if (queryStatus === QueryStatuses.error) {
    message = 'Query error, try again with another data';
  }
  if (queryStatus === QueryStatuses.pending) {
    message = 'Query pending';
  }
  return (
    <div>
      {isLoged && <Redirect to="/" />}
      <form onSubmit={(e) => submitHAndler(e)} name={formName} className="SignUp">
        <h2>{message}</h2>
        {children}
        <div className="AuthFormControls">
          <button type="submit">{formName}</button>
          <a href="/">
            <button type="button">cancel</button>
          </a>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;

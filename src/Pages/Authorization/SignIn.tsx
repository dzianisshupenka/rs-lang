import './Authorization.css';
import React, { FC, SyntheticEvent } from 'react';
import AuthForm from './AuthForm';
import FormTextInputs from './FormTextInputs';
import AuthTextInput from './AuthTypes';
import { signIn } from '../../api/AuthorizationAPI';
import {
  setQueryStatusAction,
  QueryStatuses,
} from '../../redux/user-reducer';
import extractSignInCredentialsFromForm from './CommonFunctions';
import store from '../../redux/store';

const arrOfTextInputs: AuthTextInput[] = [
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
    required: true,
    minLength: 1,
  },
  {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    required: true,
    minLength: 8,
  },
];

const signInFormhandler = async (event: SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();
  await store.dispatch(setQueryStatusAction(QueryStatuses.pending));

  const signInResult = await signIn(
    extractSignInCredentialsFromForm(event.target as HTMLFormElement),
  );

  if (!signInResult) { store.dispatch(setQueryStatusAction(QueryStatuses.error)); }
};

const SignIn: FC = () => (
  <div className="SignIn">
    <AuthForm formName="Login" submitHAndler={signInFormhandler}>
      <FormTextInputs arrOfTextInputs={arrOfTextInputs} />
    </AuthForm>
  </div>
);

export default SignIn;

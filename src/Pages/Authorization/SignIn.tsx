import React, { FC, SyntheticEvent } from 'react';
import AuthForm from './AuthForm';
import FormTextInputs from './FormTextInputs';
import AuthTextInput from './AuthTypes';
import { signIn } from '../../api/AuthorizationAPI';
import { SignInReqBody } from '../../api/Types';
import {
  setQueryStatusAction,
  QueryStatuses,
} from '../../redux/user-reducer';

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

const extractSignInCredentialsFromForm = (
  HTMLForm: HTMLFormElement,
): SignInReqBody => {
  const rawSignInData: FormData = new FormData(HTMLForm);
  return {
    email: (rawSignInData.get('email') as string) || '',
    password: (rawSignInData.get('password') as string) || '',
  };
};

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

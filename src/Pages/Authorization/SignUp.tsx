import React, { FC, SyntheticEvent } from 'react';
import AuthForm from './AuthForm';
import FormTextInputs from './FormTextInputs';
import AuthTextInput from './AuthTypes';
import { signIn, signUp } from '../../api/AuthorizationAPI';
import {
  setQueryStatusAction,
  QueryStatuses,
} from '../../redux/user-reducer';
import extractSignInCredentialsFromForm from './CommonFunctions';
import store from '../../redux/store';
import SetAvatar from './SetAvatar';

const arrOfTextInputs: AuthTextInput[] = [
  {
    type: 'text',
    placeholder: 'FIO',
    name: 'FIO',
    required: false,
    minLength: 1,
  },
  {
    type: 'text',
    placeholder: 'login',
    name: 'name',
    required: true,
    minLength: 1,
  },
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

const signUpFormhandler = async (event: SyntheticEvent<HTMLFormElement>) => {
  event.preventDefault();

  const rawForm: HTMLFormElement = event.target as HTMLFormElement;

  await store.dispatch(setQueryStatusAction(QueryStatuses.pending));

  const signUpResult = await signUp(new FormData(rawForm));

  if (signUpResult) {
    const signInResult = await signIn(extractSignInCredentialsFromForm(rawForm));

    if (!signInResult) { store.dispatch(setQueryStatusAction(QueryStatuses.error)); }
  } else {
    store.dispatch(setQueryStatusAction(QueryStatuses.error));
  }
};

const SignUp: FC = () => (
  <div className="AuthorizationWrapper">
    <AuthForm formName="SignUp" submitHAndler={signUpFormhandler}>
      <SetAvatar />
      <FormTextInputs arrOfTextInputs={arrOfTextInputs} />
    </AuthForm>
  </div>
);

export default SignUp;

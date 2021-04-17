import {
  BACKEND_ROUTE, SIGNIN, USERS, TOKENSLOGIN,
} from './Const';
import { SignInReqBody } from './Types';
import store from '../redux/store';
import { setUserStateAction, UserLoginData } from '../redux/user-reducer';

const saveTokenToLoxalStorage = (refreshToken: string) => localStorage.setItem('refreshToken', refreshToken);

const signUp = async (form: FormData) => {
  const rawResponse: Response = await fetch(`${BACKEND_ROUTE}${USERS}`, {
    method: 'POST',
    mode: 'cors' as RequestMode,
    // headers: {
    //   'Content-Type': 'application/json',
    //   Accept: 'application/json',
    // },
    body: form,
  });

  if (rawResponse.status !== 200) {
    return false;
  }
  return true;
};

const saveLogedUserDataToStorage = (userData: UserLoginData, refreshToken: string) => {
  store.dispatch(
    setUserStateAction(userData),
  );
  saveTokenToLoxalStorage(refreshToken);
};

const signIn = async (signInData: SignInReqBody) => {
  const rawResponse: Response = await fetch(`${BACKEND_ROUTE}${SIGNIN}`, {
    method: 'POST',
    // mode: 'cors' as RequestMode,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(signInData),
  });

  if (rawResponse.status !== 200) {
    return false;
  }

  const {
    userId,
    name,
    token,
    refreshToken,
    imgSecureUrl,
    message,
  } = await rawResponse.json();
  if (message === 'Authenticated') {
    saveLogedUserDataToStorage({
      userId,
      name,
      token,
      imgSecureUrl,
    }, refreshToken);
    return true;
  }
  return false;
};

const getUserUsingRefreshToken = async () => {
  const storedRefreshToken: string = localStorage.getItem('refreshToken') || '';
  const rawResponse: Response = await fetch(`${BACKEND_ROUTE}${TOKENSLOGIN}`, {
    method: 'PUT',
    // credentials: 'include',
    mode: 'cors' as RequestMode,
    headers: {
      Authorization: `Bearer ${storedRefreshToken}`,
      Accept: 'application/json',
    },
  });

  if (rawResponse.status !== 200) {
    return false;
  }
  const {
    userId,
    name,
    token,
    refreshToken,
    imgSecureUrl,
  } = await rawResponse.json();

  saveLogedUserDataToStorage({
    userId,
    name,
    token,
    imgSecureUrl,
  }, refreshToken);
  return true;
};

// eslint-disable-next-line import/prefer-default-export
export {
  signIn, saveTokenToLoxalStorage, signUp, getUserUsingRefreshToken,
};

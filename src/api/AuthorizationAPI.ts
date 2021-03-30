import { BACKEND_ROUTE, SIGNIN } from './Const';
import { SignInReqBody } from './Types';
import store from '../redux/store';
import { setUserStateAction } from '../redux/user-reducer';

const saveTokenToLoxalStorage = (token: string) => localStorage.setItem('token', token);

const signIn = async (signInData: SignInReqBody) => {
  const rawResponse: Response = await fetch(`${BACKEND_ROUTE}${SIGNIN}`, {
    method: 'POST',
    mode: 'cors' as RequestMode,
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
    imgSecureUrl,
    message,
  } = await rawResponse.json();
  if (message === 'Authenticated') {
    store.dispatch(
      setUserStateAction({
        userId,
        name,
        token,
        imgSecureUrl,
      }),
    );
    saveTokenToLoxalStorage(token);
    return true;
  }
  return false;
};

// eslint-disable-next-line import/prefer-default-export
export { signIn, saveTokenToLoxalStorage };

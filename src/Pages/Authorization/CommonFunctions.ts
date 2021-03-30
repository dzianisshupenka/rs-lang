import { SignInReqBody } from '../../api/Types';

const extractSignInCredentialsFromForm = (
  HTMLForm: HTMLFormElement,
): SignInReqBody => {
  const rawSignInData: FormData = new FormData(HTMLForm);
  return {
    email: (rawSignInData.get('email') as string) || '',
    password: (rawSignInData.get('password') as string) || '',
  };
};

export default extractSignInCredentialsFromForm;

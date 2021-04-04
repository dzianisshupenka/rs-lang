export type UserLoginData = {
  userId: string;
  name: string;
  token: string;
  imgSecureUrl: string;
};

enum QueryStatuses {
  none = 'NONE',
  pending = 'PENDING',
  error = 'ERROR',
}
type LogedData = {
  isLoged: boolean;
};

type UserState = { queryStatus: QueryStatuses } & UserLoginData & LogedData;

enum UserStateActionTypes {
  SETUSERSTATE = 'SETUSERSTATE',
  CLEARUSERSTATE = 'CLEARUSERSTATE',
  SETQUERYSTATUS = 'SETQUERYSTATUS',
}

type SeetUserStateAction = {
  type: UserStateActionTypes.SETUSERSTATE;
  payload: UserLoginData & LogedData;
};

type ClearUserStateAction = {
  type: UserStateActionTypes.CLEARUSERSTATE;
};

type SetQueryStatusAction = {
  type: UserStateActionTypes.SETQUERYSTATUS;
  payload: QueryStatuses;
};

type UserStateActions = SeetUserStateAction | ClearUserStateAction | SetQueryStatusAction;

const initialState: UserState = {
  isLoged: false,
  userId: '',
  name: '',
  token: '',
  imgSecureUrl: '',
  queryStatus: QueryStatuses.none,
};

function UserStateReduser(
  state = initialState,
  action: UserStateActions,
): UserState {
  switch (action.type) {
    case UserStateActionTypes.CLEARUSERSTATE:
      return { ...initialState };
    case UserStateActionTypes.SETUSERSTATE:
      return { ...state, ...action.payload };
    case UserStateActionTypes.SETQUERYSTATUS:
      return { ...state, queryStatus: action.payload };
    default:
      return state;
  }
}

const setUserStateAction = (loggerUserData: UserLoginData):SeetUserStateAction => ({
  type: UserStateActionTypes.SETUSERSTATE,
  payload: { isLoged: true, ...loggerUserData },
});

const setQueryStatusAction = (newQueryStatus: QueryStatuses): SetQueryStatusAction => ({
  type: UserStateActionTypes.SETQUERYSTATUS,
  payload: newQueryStatus,
});

export {
  UserStateReduser, setUserStateAction, setQueryStatusAction, QueryStatuses,
};

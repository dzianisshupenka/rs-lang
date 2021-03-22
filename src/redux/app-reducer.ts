const TEST = 'rs-lang/TEST';

const InitialState = {
  test: 'test',
};

type InitialStateType = typeof InitialState;

type ActionsType = TestActionCreatorType;

const appReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        test: action.test,
      };
    default:
      return state;
  }
};

type TestActionCreatorType = {
  type: typeof TEST,
  test: string,
};

export const testActionCreator = (): TestActionCreatorType => ({
  type: TEST,
  test: 'new-test',
});

export default appReducer;

import types, {
    Action,
    createAction,
    PayloadedAction,
    createPayloadedAction
} from "./types";

export interface ActionSignUp extends Action<types.SIGN_UP> {}

export interface ActionLogIn extends PayloadedAction<types.LOG_IN, number> {}
export interface ActionLogOut extends Action<types.LOG_OUT> {}

const signUp = createAction<ActionSignUp>(types.SIGN_UP);
const logIn = createPayloadedAction<ActionLogIn>(types.LOG_IN);
const logOut = createAction<ActionLogOut>(types.LOG_OUT);

export default {
    signUp,
    logIn,
    logOut
};

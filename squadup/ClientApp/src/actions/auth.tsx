import types, { Action, createAction } from "./types";

export interface ActionSignUp extends Action<types.SIGN_UP> {}

export interface ActionLogIn extends Action<types.LOG_IN> {}
export interface ActionLogOut extends Action<types.LOG_OUT> {}

const signUp = createAction<ActionSignUp>(types.SIGN_UP);
const logIn = createAction<ActionLogIn>(types.LOG_IN);
const logOut = createAction<ActionLogOut>(types.LOG_OUT);

export default {
    signUp,
    logIn,
    logOut
};

import { ActionSignUp, ActionLogIn, ActionLogOut } from "../actions/auth";

type Action = ActionSignUp | ActionLogIn | ActionLogOut;

export interface Auth {
    isUserLoggedIn: boolean;
}
const auth: Auth = {
    isUserLoggedIn: false
};

export default (state: Auth = auth, action: Action) => {
    const newState = { ...state };
    switch (action.type) {
        case "LOG_IN":
            newState.isUserLoggedIn = true;
            return newState;
        case "LOG_OUT":
            newState.isUserLoggedIn = false;
            return newState;
        case "SIGN_UP":
            newState.isUserLoggedIn = true;
            return newState;
        default:
            return state;
    }
};

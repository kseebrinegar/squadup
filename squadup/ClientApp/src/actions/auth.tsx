import { Dispatch } from "redux";

const signUp = (): { type: string } => {
    return {
        type: "SIGN_UP"
    };
};

const logIn = (): { type: string } => {
    return {
        type: "LOG_IN"
    };
};

const logOut = () => {
    return function(dispatch: Dispatch): void {
        dispatch({
            type: "LOG_OUT"
        });
    };
};

export default {
    signUp,
    logIn,
    logOut
};

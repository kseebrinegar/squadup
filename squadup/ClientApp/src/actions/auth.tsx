import { Dispatch } from "redux";

const signUp = () => {
    return {
        type: "SIGN_UP"
    };
};

const logIn = () => {
    return {
        type: "LOG_IN"
    };
};

const logOut = () => {
    return function(dispatch: Dispatch) {
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

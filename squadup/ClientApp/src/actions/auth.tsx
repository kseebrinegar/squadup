import { Dispatch } from "redux";
import axios from "axios";

const signUp = () => {
    const email: string = "test";
    const password: string = "test";
    return (dispatch: Dispatch) => {
        axios.post("https://reqres.in/api/login", { email, password }).then(
            () => {
                // console.log(res);
                dispatch({
                    type: "SIGN_UP"
                });
            },
            () => {
                // console.log(e);
            }
        );
    };
};

const logIn = () => {
    const email: string = "test";
    const password: string = "test";
    return function(dispatch: Dispatch) {
        axios.post("https://reqres.in/api/login", { email, password }).then(
            () => {
                dispatch({
                    type: "LOG_IN"
                });
            },
            () => {}
        );
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

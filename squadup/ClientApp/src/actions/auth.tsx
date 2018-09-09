import { Dispatch } from "redux";
import axios from "axios";

const signUp = (username: string, password: string, email: string) => {
    // console.log(username + " " + password + " " + email);

    return (dispatch: Dispatch) => {
        axios.post("https://reqres.in/api/login", { email, password }).then(
            (res: unknown) => {
                // console.log(res);
                dispatch({
                    type: "SIGN_UP"
                });
            },
            e => {
                // console.log(e);
            }
        );
    };
};

const logIn = (username: string, password: string) => {
    return function(dispatch: Dispatch) {
        axios.post("https://reqres.in/api/login", { username, password }).then(
            (res: unknown) => {
                // console.log(res);
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

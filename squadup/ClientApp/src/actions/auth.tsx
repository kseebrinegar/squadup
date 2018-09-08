import axios from "axios";
import { Dispatch } from "redux";

const signUp = (username: string, password: string, email: string) => {
    console.log(username + " " + password + " " + email);

    return (dispatch: Dispatch) => {
        axios.post("https://reqres.in/api/login", { email, password }).then(
            (res: any) => {
                console.log(res.data);
                dispatch({
                    type: "SIGN_UP"
                });
            },
            e => {
                console.log(e);
            }
        );
    };
};

const logIn = (username: string, password: string) => {
    return function(dispatch: Dispatch) {
        axios.post("https://reqres.in/api/login", { username, password }).then(
            (res: any) => {
                console.log(res.data);
                dispatch({
                    type: "LOG_IN"
                });
            },
            e => {
                console.log(e);
                console.log(`error: could not send payment.`);
            }
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

const forgotPassword = () => {
    // console.log("forgotPassword");
};

export default {
    signUp,
    logIn,
    logOut,
    forgotPassword
};

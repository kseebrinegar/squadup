import axios from "axios";

const signUp = (username: string, password: string, email: string) => {
    console.log(username + " " + password + " " + email);

    return function(dispatch: any) {
        axios.post("https://reqres.in/api/login", { email, password }).then(
            (res: any) => {
                console.log(res.data);
                dispatch({
                    type: "SIGN_UP"
                });
            },
            e => {
                console.log(e);
                console.log(`error: could not send payment.`);
            }
        );
    };
};

const logIn = (username: string, password: string) => {
    return function(dispatch: any) {
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
    console.log("fuck");
    return function(dispatch: any) {
        dispatch({
            type: "LOG_OUT"
        });
    };
};

const forgotPassword = () => {
    console.log("forgotPassword");
};

export default {
    signUp,
    logIn,
    logOut,
    forgotPassword
};

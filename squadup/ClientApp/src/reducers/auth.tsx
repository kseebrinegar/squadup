import { ActionSignUp, ActionLogIn, ActionLogOut } from "../actions/auth";

type Action = ActionSignUp | ActionLogIn | ActionLogOut;

const authToken: boolean = localStorage.getItem("basicUserInfo") ? true : false;
export default (state: boolean = authToken, action: Action) => {
    switch (action.type) {
        case "LOG_IN":
            localStorage.setItem(
                "basicUserInfo",
                JSON.stringify({ authToken: "loggedIn" })
            );
            return true;
        case "LOG_OUT":
            localStorage.clear();
            return false;
        case "SIGN_UP":
            localStorage.setItem(
                "basicUserInfo",
                JSON.stringify({ authToken: "loggedIn" })
            );
            return true;
        default:
            return state;
    }
};

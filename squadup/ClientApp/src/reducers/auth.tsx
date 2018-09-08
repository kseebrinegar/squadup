const authToken: boolean = localStorage.getItem("authToken") ? true : false;

export default (state: boolean = authToken, action: { type: string }) => {
    switch (action.type) {
        case "LOG_IN":
            localStorage.setItem("authToken", "");
            localStorage.setItem("authToken", "test");
            return true;
        case "LOG_OUT":
            localStorage.setItem("authToken", "");
            return false;
        case "SIGN_UP":
            localStorage.setItem("authToken", "test");
            return true;
        default:
            return state;
    }
};

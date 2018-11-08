import {
    ActionToggleLogOutPopUp,
    ActionToggleSideBarNavImgPopUp,
    ActionToggleLogInPopUp,
    ActionToggleSignUpPopUp,
    ActionToggleForgotPasswordPopUp
} from "../actions/modalPopUp";

type Action =
    | ActionToggleLogOutPopUp
    | ActionToggleSideBarNavImgPopUp
    | ActionToggleLogInPopUp
    | ActionToggleSignUpPopUp
    | ActionToggleForgotPasswordPopUp;

export type ModalPopUps = {
    isLogOutPopUpShown: boolean;
    isSideBarNavPopUpShown: boolean;
    isLogInPopUpShown: boolean;
    isSignUpPopUpShown: boolean;
    isForgotPasswordShown: boolean;
};

const stateDefault: ModalPopUps = {
    isLogOutPopUpShown: false,
    isSideBarNavPopUpShown: false,
    isLogInPopUpShown: false,
    isSignUpPopUpShown: false,
    isForgotPasswordShown: false
};

export default (state: ModalPopUps = stateDefault, action: Action) => {
    const newState: ModalPopUps = { ...state };
    switch (action.type) {
        case "IS_LOG_OUT_POP_UP_SHOWN":
            newState.isLogOutPopUpShown = newState.isLogOutPopUpShown
                ? false
                : true;
            return newState;
        case "IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN":
            newState.isSideBarNavPopUpShown = newState.isSideBarNavPopUpShown
                ? false
                : true;
            return newState;
        case "IS_LOG_IN_POP_UP_SHOWN":
            newState.isLogInPopUpShown = action.payload;
            newState.isSignUpPopUpShown = false;
            newState.isForgotPasswordShown = false;
            return newState;
        case "IS_SIGN_UP_POP_UP_SHOWN":
            newState.isSignUpPopUpShown = action.payload;
            newState.isLogInPopUpShown = false;
            newState.isForgotPasswordShown = false;
            return newState;
        case "IS_FORGOT_PASSWORD_POP_UP_SHOWN":
            newState.isForgotPasswordShown = action.payload;
            newState.isSignUpPopUpShown = false;
            newState.isLogInPopUpShown = false;
            return newState;
        default:
            return state;
    }
};

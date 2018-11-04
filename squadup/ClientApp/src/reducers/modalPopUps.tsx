import {
    ActionToggleLogOutPopUp,
    ActionCloseLogOutPopUp
} from "../actions/modalPopUp";

type Action = ActionToggleLogOutPopUp | ActionCloseLogOutPopUp;

export type ModalPopUps = { isLogOutPopUpShown: boolean };
const stateDefault: ModalPopUps = {
    isLogOutPopUpShown: false
};

export default (state: ModalPopUps = stateDefault, action: Action) => {
    const newState: ModalPopUps = { ...state };
    switch (action.type) {
        case "IS_LOG_OUT_POP_UP_SHOWN":
            newState.isLogOutPopUpShown = newState.isLogOutPopUpShown
                ? false
                : true;
            return newState;
        case "CLOSE_LOG_OUT_POP_UP":
            newState.isLogOutPopUpShown = false;
            return newState;
        default:
            return state;
    }
};

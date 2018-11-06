import {
    ActionToggleLogOutPopUp,
    ActionCloseLogOutPopUp,
    ActionToggleSideBarNavImgPopUp,
    ActionCloseSideBarNavImgPopUp
} from "../actions/modalPopUp";

type Action =
    | ActionToggleLogOutPopUp
    | ActionCloseLogOutPopUp
    | ActionToggleSideBarNavImgPopUp
    | ActionCloseSideBarNavImgPopUp;

export type ModalPopUps = {
    isLogOutPopUpShown: boolean;
    isSideBarNavPopUpShown: boolean;
};

const stateDefault: ModalPopUps = {
    isLogOutPopUpShown: false,
    isSideBarNavPopUpShown: false
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
        case "IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN":
            newState.isSideBarNavPopUpShown = newState.isSideBarNavPopUpShown
                ? false
                : true;
            return newState;
        case "CLOSE_SIDEBAR_NAV_IMG_POP_UP":
            newState.isSideBarNavPopUpShown = false;
            return newState;
        default:
            return state;
    }
};

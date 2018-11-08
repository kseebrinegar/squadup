import types, {
    Action,
    PayloadedAction,
    createPayloadedAction,
    createAction
} from "./types";

export interface ActionToggleLogOutPopUp
    extends Action<types.IS_LOG_OUT_POP_UP_SHOWN> {}

export interface ActionToggleSideBarNavImgPopUp
    extends Action<types.IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN> {}

export interface ActionToggleLogInPopUp
    extends PayloadedAction<types.IS_LOG_IN_POP_UP_SHOWN, boolean> {}

export interface ActionToggleSignUpPopUp
    extends PayloadedAction<types.IS_SIGN_UP_POP_UP_SHOWN, boolean> {}

export interface ActionToggleForgotPasswordPopUp
    extends PayloadedAction<types.IS_FORGOT_PASSWORD_POP_UP_SHOWN, boolean> {}

const toggleLogOutPopUp = createAction<ActionToggleLogOutPopUp>(
    types.IS_LOG_OUT_POP_UP_SHOWN
);

const toggleSideBarNavImgPopUp = createAction<ActionToggleSideBarNavImgPopUp>(
    types.IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN
);

const toggleLogInPopUp = createPayloadedAction<ActionToggleLogInPopUp>(
    types.IS_LOG_IN_POP_UP_SHOWN
);

const toggleSignUpPopUp = createPayloadedAction<ActionToggleSignUpPopUp>(
    types.IS_SIGN_UP_POP_UP_SHOWN
);

const toggleForgotPasswordPopUp = createPayloadedAction<
    ActionToggleForgotPasswordPopUp
>(types.IS_FORGOT_PASSWORD_POP_UP_SHOWN);

export default {
    toggleLogOutPopUp,
    toggleSideBarNavImgPopUp,
    toggleLogInPopUp,
    toggleSignUpPopUp,
    toggleForgotPasswordPopUp
};

import types, { Action, createAction } from "./types";

export interface ActionToggleLogOutPopUp
    extends Action<types.IS_LOG_OUT_POP_UP_SHOWN> {}

export interface ActionCloseLogOutPopUp
    extends Action<types.CLOSE_LOG_OUT_POP_UP> {}

const toggleLogOutPopUp = createAction<ActionToggleLogOutPopUp>(
    types.IS_LOG_OUT_POP_UP_SHOWN
);

const closeLogOutPopUp = createAction<ActionCloseLogOutPopUp>(
    types.CLOSE_LOG_OUT_POP_UP
);

export default {
    toggleLogOutPopUp,
    closeLogOutPopUp
};

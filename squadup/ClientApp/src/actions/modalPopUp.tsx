import types, { Action, createAction } from "./types";

export interface ActionToggleLogOutPopUp
    extends Action<types.IS_LOG_OUT_POP_UP_SHOWN> {}

export interface ActionCloseLogOutPopUp
    extends Action<types.CLOSE_LOG_OUT_POP_UP> {}

export interface ActionToggleSideBarNavImgPopUp
    extends Action<types.IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN> {}

export interface ActionCloseSideBarNavImgPopUp
    extends Action<types.CLOSE_SIDEBAR_NAV_IMG_POP_UP> {}

const toggleLogOutPopUp = createAction<ActionToggleLogOutPopUp>(
    types.IS_LOG_OUT_POP_UP_SHOWN
);

const closeLogOutPopUp = createAction<ActionCloseLogOutPopUp>(
    types.CLOSE_LOG_OUT_POP_UP
);

const toggleSideBarNavImgPopUp = createAction<ActionToggleSideBarNavImgPopUp>(
    types.IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN
);

const closeSideBarNavImgPopUp = createAction<ActionCloseSideBarNavImgPopUp>(
    types.CLOSE_SIDEBAR_NAV_IMG_POP_UP
);

export default {
    toggleLogOutPopUp,
    closeLogOutPopUp,
    toggleSideBarNavImgPopUp,
    closeSideBarNavImgPopUp
};

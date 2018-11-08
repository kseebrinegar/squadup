enum types {
    SIGN_UP = "SIGN_UP",
    LOG_IN = "LOG_IN",
    LOG_OUT = "LOG_OUT",
    UPLOAD_IMG = "UPLOAD_IMG",
    GET_SIDERBAR_ICONS_DATA = "GET_SIDERBAR_ICONS_DATA",
    GET_All_SIDERBAR_DATA = "GET_All_SIDERBAR_DATA",
    IS_LOG_OUT_POP_UP_SHOWN = "IS_LOG_OUT_POP_UP_SHOWN",
    IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN = "IS_SIDEBAR_NAV_IMG_POP_UP_SHOWN",
    IS_LOG_IN_POP_UP_SHOWN = "IS_LOG_IN_POP_UP_SHOWN",
    IS_SIGN_UP_POP_UP_SHOWN = "IS_SIGN_UP_POP_UP_SHOWN",
    IS_FORGOT_PASSWORD_POP_UP_SHOWN = "IS_FORGOT_PASSWORD_POP_UP_SHOWN"
}
export default types;

export interface PayloadedAction<TType, TPayload> {
    type: TType;
    payload: TPayload;
}

export interface Action<TType> {
    type: TType;
}

export function createPayloadedAction<
    TAction extends PayloadedAction<TAction["type"], TAction["payload"]>
>(
    type: TAction["type"]
): (
    payload: TAction["payload"]
) => PayloadedAction<TAction["type"], TAction["payload"]> {
    return (payload: TAction["payload"]) => ({
        type: type,
        payload
    });
}

export function createAction<TAction extends Action<TAction["type"]>>(
    type: TAction["type"]
): () => Action<TAction["type"]> {
    return () => ({
        type: type
    });
}

export function createActionMulti<TAction extends Action<TAction["type"]>>(
    type: TAction["type"]
): () => Action<TAction["type"][]> {
    return () => ({
        type: type
    });
}

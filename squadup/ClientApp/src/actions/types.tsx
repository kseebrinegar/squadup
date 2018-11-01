enum types {
    SIGN_UP = "SIGN_UP",
    LOG_IN = "LOG_IN",
    UPLOAD_IMG = "UPLOAD_IMG",
    GET_SIDERBAR_ICONS_DATA = "GET_SIDERBAR_ICONS_DATA",
    GET_All_SIDERBAR_DATA = "GET_All_SIDERBAR_DATA",
    LOG_OUT = "LOG_OUT"
}
export default types;

export interface PayloadedAction<TType, TPayload> {
    type: TType;
    payload: TPayload;
}

export interface Action<TType> {
    type: TType;
}

export interface Payloaded<TPayload> {
    payload: TPayload;
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

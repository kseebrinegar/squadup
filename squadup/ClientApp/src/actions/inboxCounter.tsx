import types, { PayloadedAction } from "./types";
import { Dispatch } from "redux";
import axios from "axios";

export interface ActionInboxCounter
    extends PayloadedAction<types.GET_INBOX_COUNTER, number> {}

const requestInboxCount = (): Function => {
    const testData = {
        inboxCounter: 89
    };

    return (dispatch: Dispatch) => {
        axios
            .get("https://reqres.in/api/users?delay=1")
            .then(() => {
                dispatch<ActionInboxCounter>({
                    type: types.GET_INBOX_COUNTER,
                    payload: testData.inboxCounter
                });
            })
            .catch(() => {});
    };
};

export default requestInboxCount;

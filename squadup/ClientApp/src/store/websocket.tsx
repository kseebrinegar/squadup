import * as signalR from "@aspnet/signalr";
import types from "../actions/types";
import { Store } from "redux";
import { AppState } from "./types";

const receiveDataTypes = {
    [types.GET_INBOX_COUNTER]: types.GET_INBOX_COUNTER,
    [types.GET_SIDERBAR_ICONS_DATA]: types.GET_SIDERBAR_ICONS_DATA
};

let connection: signalR.HubConnection;

export const webSocketInit = (store: Store<AppState>) => {
    let previousIsUserLoggedIn = store.getState().auth.isUserLoggedIn;

    store.subscribe(() => {
        const newIsUserLoggedIn = store.getState().auth.isUserLoggedIn;

        if (
            newIsUserLoggedIn !== previousIsUserLoggedIn &&
            newIsUserLoggedIn === false
        ) {
            disconnectWebSocket();
        }

        if (
            newIsUserLoggedIn !== previousIsUserLoggedIn &&
            newIsUserLoggedIn === true
        ) {
            connectWebSocket(store);
        }

        previousIsUserLoggedIn = newIsUserLoggedIn;
    });

    if (previousIsUserLoggedIn) {
        connectWebSocket(store);
    }
};

const connectWebSocket = (store: Store<AppState>) => {
    connection = new signalR.HubConnectionBuilder()
        .withUrl("ws://echo.websocket.org")
        .build();

    Object.keys(receiveDataTypes).forEach(type => {
        connection.on(
            type,
            (payload: {}): void => {
                store.dispatch({
                    type,
                    payload
                });
            }
        );
    });

    connection.start().catch((err: unknown) => {
        err;
        return;
    });
};

const disconnectWebSocket = () => {
    // console.log(connection.stop());
    // connection.off(types.GET_INBOX_COUNTER);
    // console.log(connection);
};

export const invoke = (type: string, payload: {}) => {
    connection.invoke(type, payload).catch(() => {});
};

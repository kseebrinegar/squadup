import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    Store
} from "redux";
import { AppState } from "./types";
import thunk from "redux-thunk";
import auth, { Auth } from "../reducers/auth";
import basicUserInfo, {
    BasicUserInfo,
    basicUserInfoDefault
} from "../reducers/basicUserInfo";
import modalPopUps from "../reducers/modalPopUps";
import { loadState, localStorageOnBeforeUnload } from "../store/localStorage";
import { webSocketInit, invoke } from "./websocket";

const composeEnhancers =
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initalState: { auth: Auth; basicUserInfo: BasicUserInfo } = {
    auth: loadState("auth"),
    basicUserInfo: { ...basicUserInfoDefault, ...loadState("basicUserInfo") }
};

const setStore = (): Store<AppState> => {
    const store: Store<AppState> = createStore(
        combineReducers({
            auth,
            basicUserInfo,
            modalPopUps
        }),
        initalState,
        composeEnhancers(applyMiddleware(thunk.withExtraArgument(invoke)))
    );

    localStorageOnBeforeUnload(store);

    webSocketInit(store);

    return store;
};

export default setStore;

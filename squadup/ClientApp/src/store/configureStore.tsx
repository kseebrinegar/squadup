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
import basicUserInfo, { BasicUserInfo } from "../reducers/basicUserInfo";
import modalPopUps from "../reducers/modalPopUps";
import { loadState, saveState } from "../store/localStorage";

const composeEnhancers =
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initalState: { auth: Auth; basicUserInfo: BasicUserInfo } = {
    auth: loadState("auth"),
    basicUserInfo: loadState("basicUserInfo")
};

const setStore = () => {
    const store: Store<AppState> = createStore(
        combineReducers({
            auth,
            basicUserInfo,
            modalPopUps
        }),
        initalState,
        composeEnhancers(applyMiddleware(thunk))
    );

    window.onbeforeunload = (): void => {
        const {
            auth,
            basicUserInfo
        }: { auth: Auth; basicUserInfo: BasicUserInfo } = store.getState();

        if (auth.isUserLoggedIn === false) {
            localStorage.clear();
        } else {
            saveState("basicUserInfo", basicUserInfo);
            saveState("auth", auth);
        }
    };

    return store;
};

export default setStore;

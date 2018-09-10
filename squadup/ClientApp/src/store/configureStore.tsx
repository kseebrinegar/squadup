import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore,
    Store
} from "redux";
import { AppState } from "./types";
import thunk from "redux-thunk";
import auth from "../reducers/auth";

const composeEnhancers =
    // tslint:disable-next-line:no-any
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setStore = () => {
    const store: Store<AppState> = createStore(
        combineReducers({
            auth
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
export default setStore;

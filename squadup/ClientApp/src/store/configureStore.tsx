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
// @ts-ignore
const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store: Store<AppState> = createStore(
    combineReducers({
        auth
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export default store;

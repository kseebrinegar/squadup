import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import auth from "../reducers/auth";

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setStore = () => {
    const store = createStore(
        combineReducers({
            auth
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

export default setStore;

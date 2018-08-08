import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const setStore = () => {
    const store = createStore(
        combineReducers({}),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};

export default setStore;

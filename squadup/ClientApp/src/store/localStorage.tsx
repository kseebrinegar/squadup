import { Store } from "redux";
import { AppState } from "./types";
import { Auth } from "../reducers/auth";
import { BasicUserInfo } from "../reducers/basicUserInfo";

export const loadState = (keyName: string) => {
    try {
        const serializedState = localStorage.getItem(keyName);
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

export const saveState = (keyName: string, state: object): void => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(keyName, serializedState);
    } catch {
        // ignore write errors
    }
};

export const localStorageOnBeforeUnload = (store: Store<AppState>): void => {
    window.onbeforeunload = (): void => {
        const {
            auth,
            basicUserInfo
        }: { auth: Auth; basicUserInfo: BasicUserInfo } = store.getState();

        let newBasicUserInfo = removePropsFromReducerBeforeSaving(
            basicUserInfo
        );

        if (auth.isUserLoggedIn === false) {
            localStorage.clear();
        } else {
            saveState("basicUserInfo", newBasicUserInfo);
            saveState("auth", auth);
        }
    };
};

const removePropsFromReducerBeforeSaving = (
    reducer: BasicUserInfo
): Record<string, string> => {
    const itemsToBeRemoved = [
        "userProfileLikesCount",
        "userProfileViewsCount",
        "userIsfollowingCount",
        "userProjectsCount"
    ];

    let newReducerObject: Record<string, string> = {};

    for (let ele in reducer) {
        if (itemsToBeRemoved.indexOf(ele) === -1) {
            newReducerObject[ele] = reducer[ele];
        }
    }

    return newReducerObject;
};

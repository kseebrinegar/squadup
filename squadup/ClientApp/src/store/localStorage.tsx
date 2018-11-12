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

export const saveState = (keyName: string, state: object) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem(keyName, serializedState);
    } catch {
        // ignore write errors
    }
};

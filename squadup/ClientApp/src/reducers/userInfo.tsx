interface UserInfoState {
    imgSrc: string;
}

interface UserInfoAction {
    type: string;
    payload: string;
}

const userInfoDefault: UserInfoState = {
    imgSrc: "/images/default-user-img.jpg"
};

export default (
    state: UserInfoState = userInfoDefault,
    action: UserInfoAction
) => {
    const newState: UserInfoState = { ...state };
    switch (action.type) {
        case "UPLOAD_IMG":
            newState.imgSrc = action.payload;
            return newState;
        default:
            return state;
    }
};

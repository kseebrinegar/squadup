interface UserInfoState {
    imgSrc: string;
    userName: string;
    userProfileLikesCount: number;
    userProfileViewsCount: number;
    userIsfollowingCount: number;
    userProjectsCount: number;
}

interface ActionImgUpload {
    type: string;
    payload: string;
}

interface ActionUserGetDashboard {
    type: string;
    payload: [{ [prop: string]: number }];
}

type Action = ActionUserGetDashboard & ActionImgUpload;

const userInfoDefault: UserInfoState = {
    imgSrc: "/images/default-user-img.jpg",
    userName: "",
    userProfileLikesCount: 0,
    userProfileViewsCount: 0,
    userIsfollowingCount: 0,
    userProjectsCount: 0
};

export default (state: UserInfoState = userInfoDefault, action: Action) => {
    const newState: UserInfoState = { ...state };
    switch (action.type) {
        case "UPLOAD_IMG":
            newState.imgSrc = action.payload;
            return newState;
        case "GET_DASHBOARD":
            for (let prop in action.payload) {
                newState[prop] = action.payload[prop];
            }
            return newState;
        default:
            return state;
    }
};

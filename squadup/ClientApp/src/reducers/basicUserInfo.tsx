import {
    ActionUserAllSideBarData,
    ActionUserGetSideBarIconsData
} from "../actions/sideBarNav";
import { ActionImgUpload } from "../actions/uploadImg";

export type BasicUserInfo = {
    imgSrc: string;
    userProfileLikesCount: number;
    userProfileViewsCount: number;
    userIsfollowingCount: number;
    userProjectsCount: number;
    userName: string;
};

type Action =
    | ActionImgUpload
    | ActionUserAllSideBarData
    | ActionUserGetSideBarIconsData;

const userInfoDefault: BasicUserInfo = {
    imgSrc: "/images/default-user-img.jpg",
    userName: "",
    userProfileLikesCount: 0,
    userProfileViewsCount: 0,
    userIsfollowingCount: 0,
    userProjectsCount: 0
};

export default (
    state: BasicUserInfo = userInfoDefault,
    action: Action
): BasicUserInfo => {
    const newState: BasicUserInfo = { ...state };
    switch (action.type) {
        case "UPLOAD_IMG":
            newState.imgSrc = action.payload;
            return newState;
        case "GET_All_SIDERBAR_DATA":
            for (let prop in action.payload) {
                newState[prop] = action.payload[prop];
            }
            return newState;
        case "GET_SIDERBAR_ICONS_DATA":
            for (let prop in action.payload) {
                newState[prop] = action.payload[prop];
            }
            return newState;
        default:
            return state;
    }
};

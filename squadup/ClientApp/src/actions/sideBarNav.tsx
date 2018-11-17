import axios from "axios";
import { Dispatch } from "redux";
import types, { PayloadedAction } from "./types";

export interface ActionUserAllSideBarData
    extends PayloadedAction<
        types.GET_All_SIDERBAR_DATA,
        { [prop: string]: number | string }
    > {}

export interface ActionUserGetSideBarIconsData
    extends PayloadedAction<
        types.GET_SIDERBAR_ICONS_DATA,
        { [prop: string]: number }
    > {}

const requestAllSideBarData = (stopLoader: () => void): Function => {
    const testData = {
        userProfileLikesCount: 1111,
        userProfileViewsCount: 10555,
        userIsfollowingCount: 23099,
        userProjectsCount: 1199,
        userName: "xxxCaseyxxx",
        imgSrc: "images/default-user-img.jpg"
    };

    return (dispatch: Dispatch) => {
        axios
            .get("https://reqres.in/api/users?delay=1")
            .then(() => {
                dispatch<ActionUserAllSideBarData>({
                    type: types.GET_All_SIDERBAR_DATA,
                    payload: { ...testData }
                });
                stopLoader();
            })
            .catch(() => {
                stopLoader();
            });
    };
};

const requestSideBarIconsData = (stopLoader: () => void): Function => {
    const testData = {
        userProfileLikesCount: 111,
        userProfileViewsCount: 10555,
        userIsfollowingCount: 230999,
        userProjectsCount: 1199999
    };

    return (dispatch: Dispatch) => {
        axios
            .get("https://reqres.in/api/users?delay=0")
            .then(() => {
                dispatch<ActionUserGetSideBarIconsData>({
                    type: types.GET_SIDERBAR_ICONS_DATA,
                    payload: { ...testData }
                });
                stopLoader();
            })
            .catch(() => {
                stopLoader();
            });
    };
};

export default {
    requestAllSideBarData,
    requestSideBarIconsData
};

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

const requestAllSideBarData = (): Function => {
    const testData = {
        userProfileLikesCount: 1111,
        userProfileViewsCount: 10555,
        userIsfollowingCount: 23099,
        userProjectsCount: 1199,
        userName: "xxxCaseyxxx",
        imgSrc: "/images/test.png"
    };

    return (dispatch: Dispatch) => {
        axios
            .get("https://reqres.in/api/unknown/2")
            .then(() => {
                dispatch<ActionUserAllSideBarData>({
                    type: types.GET_All_SIDERBAR_DATA,
                    payload: { ...testData }
                });
            })
            .catch(() => {});
    };
};

const requestSideBarIconsData = (): Function => {
    const testData = {
        userProfileLikesCount: 111,
        userProfileViewsCount: 10555,
        userIsfollowingCount: 230999,
        userProjectsCount: 1199999
    };

    return (dispatch: Dispatch) => {
        axios
            .get("https://reqres.in/api/unknown/2")
            .then(() => {
                dispatch<ActionUserGetSideBarIconsData>({
                    type: types.GET_SIDERBAR_ICONS_DATA,
                    payload: { ...testData }
                });
            })
            .catch(() => {});
    };
};

export default {
    requestAllSideBarData,
    requestSideBarIconsData
};

import axios from "axios";
import { Dispatch } from "redux";

const dashboardOnLoad = (): Function => {
    const testData = {
        userProfileLikesCount: 111,
        userProfileViewsCount: 10555,
        userIsfollowingCount: 230999,
        userProjectsCount: 1199999,
        userName: "xxxCaseyxxx",
        imgSrc: "/images/default-user-img.jpg"
    };

    return (dispatch: Dispatch) => {
        axios
            .get("https://reqres.in/api/unknown/2")
            .then(() => {
                dispatch({
                    type: "GET_DASHBOARD",
                    payload: { ...testData }
                });
            })
            .catch(() => {});
    };
};

export default dashboardOnLoad;

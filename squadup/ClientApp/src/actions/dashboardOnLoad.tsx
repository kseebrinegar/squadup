import axios from "axios";
import { Dispatch } from "redux";

const dashboardOnLoad = (): Function => {
    const testData = {
        userProfileLikesCount: 2105,
        userProfileViewsCount: 31,
        userIsfollowingCount: 995,
        userProjectsCount: 3,
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

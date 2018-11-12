import {
    ActionUserAllSideBarData,
    ActionUserGetSideBarIconsData
} from "../actions/sideBarNav";
import { ActionImgUpload } from "../actions/uploadImg";

export type BasicUserInfo = {
    userProfileLikesCount: number;
    userProfileViewsCount: number;
    userIsfollowingCount: number;
    userProjectsCount: number;
    userName: string;
    imgSrc: string;
    /* realName: string;
    location: {
        country: string;
        state: string;
        city: string;
    };
    DOB: string;
    sex: string;
    aboutMe: string;
    hobbies: string;
    languages: {
        c: boolean;
        clojure: boolean;
        coffeeScript: boolean;
        cPlusPlus: boolean;
        crystal: boolean;
        cSharp: boolean;
        Dart: boolean;
        Elixir: boolean;
        fortran: boolean;
        fSharp: boolean;
        go: boolean;
        haskell: boolean;
        java: boolean;
        javascript: boolean;
        kotlin: boolean;
        nodeJs: boolean;
        objectiveC: boolean;
        php: boolean;
        python: boolean;
        ruby: boolean;
        rust: boolean;
        scala: boolean;
        sql: boolean;
        swift: boolean;
        typescript: boolean;
    };
    experience: string;
    skills: {
        frontend: boolean;
        backend: boolean;
        UIUX: boolean;
    };
    links: {
        github: string;
        portfolio: string;
        linkdin: string;
    };
    contact: {
        email: string;
        phone: string;
    };*/
};

type Action =
    | ActionImgUpload
    | ActionUserAllSideBarData
    | ActionUserGetSideBarIconsData;

const basicUserInfoDefault: BasicUserInfo = {
    imgSrc: "/images/default-user-img.jpg",
    userName: "xxxcaseyxxx",
    userProfileLikesCount: 0,
    userProfileViewsCount: 0,
    userIsfollowingCount: 0,
    userProjectsCount: 0
    /* realName: "",
    location: {
        country: "",
        state: "",
        city: ""
    },
    DOB: "",
    sex: "",
    aboutMe: "",
    hobbies: "",
    languages: {
        c: false,
        clojure: false,
        coffeeScript: false,
        cPlusPlus: false,
        crystal: false,
        cSharp: false,
        Dart: false,
        Elixir: false,
        fortran: false,
        fSharp: false,
        go: false,
        haskell: false,
        java: false,
        javascript: false,
        kotlin: false,
        nodeJs: false,
        objectiveC: false,
        php: false,
        python: false,
        ruby: false,
        rust: false,
        scala: false,
        sql: false,
        swift: false,
        typescript: false
    },
    experience: "",
    skills: {
        frontend: true,
        backend: false,
        UIUX: false
    },
    links: {
        github: "",
        portfolio: "",
        linkdin: ""
    },
    contact: {
        email: "",
        phone: ""
    }*/
};

export default (
    state: BasicUserInfo = basicUserInfoDefault,
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

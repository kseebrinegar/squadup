export interface AppState extends Auth, BasicUserInfo {}

export interface Auth {
    auth: boolean;
}
export interface BasicUserInfo {
    basicUserInfo: {
        imgSrc: string;
        userProfileLikesCount: number;
        userProfileViewsCount: number;
        userIsfollowingCount: number;
        userProjectsCount: number;
        userName: string;
    };
}

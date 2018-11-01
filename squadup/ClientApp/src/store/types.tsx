import { BasicUserInfo } from "../reducers/basicUserInfo";
export interface AppState extends AuthState, BasicUserInfoState {}

export interface AuthState {
    auth: boolean;
}

export interface BasicUserInfoState {
    basicUserInfo: BasicUserInfo;
}

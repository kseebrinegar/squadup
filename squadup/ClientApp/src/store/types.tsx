import { BasicUserInfo } from "../reducers/basicUserInfo";
import { Auth } from "../reducers/auth";
import { ModalPopUps } from "../reducers/modalPopUps";
export interface AppState
    extends AuthState,
        BasicUserInfoState,
        ModalPopUpsState {}

export interface AuthState {
    auth: Auth;
}

export interface BasicUserInfoState {
    basicUserInfo: BasicUserInfo;
}

export interface ModalPopUpsState {
    modalPopUps: ModalPopUps;
}

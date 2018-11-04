import { BasicUserInfo } from "../reducers/basicUserInfo";
import { ModalPopUps } from "../reducers/modalPopUps";
export interface AppState
    extends AuthState,
        BasicUserInfoState,
        ModalPopUpsState {}

export interface AuthState {
    auth: boolean;
}

export interface BasicUserInfoState {
    basicUserInfo: BasicUserInfo;
}

export interface ModalPopUpsState {
    modalPopUps: ModalPopUps;
}

import * as React from "react";
import ModalPopUp from "./modalPopUp";
import { OwnProps as UploadImgFileProps } from "../forms/uploadFile/UploadImgFile";
import { SFCmodulePopUpProps } from "./modalSmallPopUp";
import { ModalPopUps } from "../../reducers/modalPopUps";
import { AppState } from "../../store/types";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import modalPopUpsActions from "../../actions/modalPopUp";

interface OwnProps {
    successText: string;
    headerText?: string;
    clickEvent?: (arg: (arg: () => void) => void) => void;
    isPopUpShown: string;
    togglePopUp: string;
    popUpClassName: string;
}

interface StateProps {
    modalPopUpsState: ModalPopUps;
}

interface DispatchProps {
    toggleLogOutPopUp: () => { type: string };
    toggleSideBarNavImgPopUp: () => { type: string };
    toggleLogInPopUp: (payload: boolean) => { type: string; payload: boolean };
    toggleSignUpPopUp: (payload: boolean) => { type: string; payload: boolean };
    toggleForgotPasswordPopUp: (
        payload: boolean
    ) => { type: string; payload: boolean };
}

interface State {
    isNotifyShown: boolean;
    isLoaderShown: boolean;
    isDisplayPopUpModalShown: boolean;
}

type Props = OwnProps & StateProps & DispatchProps;

const modalAniAndSuccContainer = <
    P extends UploadImgFileProps | SFCmodulePopUpProps
>(
    WrappedComponent: React.ComponentType<P>
) => {
    class ModalAniAndSuccContainer extends React.Component<Props, State> {
        public state: State = {
            isNotifyShown: false,
            isLoaderShown: false,
            isDisplayPopUpModalShown: this.props.modalPopUpsState[
                this.props.isPopUpShown
            ]
        };

        constructor(props: Props) {
            super(props);
        }

        private notifyUserOfSuccess = (arg: () => void): void => {
            this.setState(() => {
                return { isLoaderShown: false, isNotifyShown: true };
            });

            this.successTimer(arg);
        };

        private successTimer = (arg: () => void): void => {
            const timer = window.setTimeout(() => {
                this.setState(() => {
                    return {
                        isNotifyShown: false
                    };
                });

                this.props[this.props.togglePopUp](false);
                arg();
                clearInterval(timer);
            }, 2000);
        };

        private dislayLoader = (): void => {
            this.setState(() => {
                return { isLoaderShown: true };
            });
        };

        private renderWrappedComponent = (): React.ReactChild => {
            if (this.props.headerText) {
                return (
                    <WrappedComponent
                        toggleDisplayPopUpModal={() => {
                            this.props[this.props.togglePopUp](
                                this.state.isDisplayPopUpModalShown
                                    ? false
                                    : true
                            );
                        }}
                        headerText={this.props.headerText}
                        clickEvent={(
                            notifyUserOfSuccess: (arg: () => void) => void
                        ) => {
                            this.props.clickEvent!(notifyUserOfSuccess);
                        }}
                        notifyUserOfSuccess={this.notifyUserOfSuccess}
                        dislayLoader={this.dislayLoader}
                    />
                );
            }

            return (
                <WrappedComponent
                    notifyUserOfSuccess={this.notifyUserOfSuccess}
                    dislayLoader={this.dislayLoader}
                    isPopUpShown={this.props.isPopUpShown}
                    togglePopUp={this.props.togglePopUp}
                />
            );
        };

        public componentWillReceiveProps = (
            nextProps: DispatchProps & StateProps
        ): void => {
            if (
                nextProps.modalPopUpsState[this.props.isPopUpShown] !==
                this.state.isDisplayPopUpModalShown
            ) {
                this.setState(() => {
                    return {
                        isDisplayPopUpModalShown:
                            nextProps.modalPopUpsState[this.props.isPopUpShown]
                    };
                });
            }
        };

        public render(): React.ReactNode {
            return (
                <ModalPopUp
                    isDisplayPopUpModalShown={
                        this.state.isDisplayPopUpModalShown
                    }
                    clickEvent={() => {
                        this.props[this.props.togglePopUp](
                            this.state.isDisplayPopUpModalShown ? false : true
                        );
                    }}
                    popUpClassName={this.props.popUpClassName}
                    isNotifyShown={this.state.isNotifyShown}
                    successText={this.props.successText}
                    isLoaderShown={this.state.isLoaderShown}
                >
                    {this.state.isNotifyShown
                        ? null
                        : this.renderWrappedComponent()}
                </ModalPopUp>
            );
        }
    }

    const mapStateToProps = (state: AppState): StateProps => {
        return { modalPopUpsState: state.modalPopUps };
    };

    const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
        bindActionCreators(
            {
                toggleLogOutPopUp: modalPopUpsActions.toggleLogOutPopUp,
                toggleSideBarNavImgPopUp:
                    modalPopUpsActions.toggleSideBarNavImgPopUp,
                toggleLogInPopUp: modalPopUpsActions.toggleLogInPopUp,
                toggleSignUpPopUp: modalPopUpsActions.toggleSignUpPopUp,
                toggleForgotPasswordPopUp:
                    modalPopUpsActions.toggleForgotPasswordPopUp
            },
            dispatch
        );

    return connect<StateProps, DispatchProps, {}, AppState>(
        mapStateToProps,
        mapDispatchToProps
    )(ModalAniAndSuccContainer);
};

export default modalAniAndSuccContainer;

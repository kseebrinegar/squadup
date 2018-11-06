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
    closePopUp: string;
    popUpClassName: string;
}

interface StateProps {
    modalPopUpsState: ModalPopUps;
}

interface DispatchProps {
    toggleLogOutPopUp: () => Action;
    closeLogOutPopUp: () => Action;
    toggleSideBarNavImgPopUp: () => Action;
    closeSideBarNavImgPopUp: () => Action;
}

interface State {
    isNotifyShown: boolean;
    isLoaderShown: boolean;
    isDisplayPopUpModalShown: boolean;
}

type Action = { type: string };
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

                this.props[this.props.closePopUp]();
                arg();
                clearInterval(timer);
            }, 1500);
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
                            this.props[this.props.togglePopUp]();
                        }}
                        headerText={this.props.headerText}
                        clickEvent={(
                            notifyUserOfSuccess: (arg: () => void) => void
                        ) => {
                            // @ts-ignore
                            this.props.clickEvent(notifyUserOfSuccess);
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
                />
            );
        };

        public componentWillReceiveProps = (nextProps: StateProps): void => {
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
                        this.props[this.props.togglePopUp]();
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
                closeLogOutPopUp: modalPopUpsActions.closeLogOutPopUp,
                toggleSideBarNavImgPopUp:
                    modalPopUpsActions.toggleSideBarNavImgPopUp,
                closeSideBarNavImgPopUp:
                    modalPopUpsActions.closeSideBarNavImgPopUp
            },
            dispatch
        );

    return connect<StateProps, DispatchProps, {}, AppState>(
        mapStateToProps,
        mapDispatchToProps
    )(ModalAniAndSuccContainer);
};

export default modalAniAndSuccContainer;

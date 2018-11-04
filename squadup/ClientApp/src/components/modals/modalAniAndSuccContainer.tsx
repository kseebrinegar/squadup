import * as React from "react";
import ModalPopUp from "./modalPopUp";
import { SFCmodulePopUpProps } from "./modalSmallPopUp";
import { AppState } from "../../store/types";
import { connect } from "react-redux";

interface OwnProps {
    successText: string;
    headerText: string;
    clickEvent: (arg: (arg: () => void) => void) => void;
    isPopUpShown: string;
    togglePopUp: () => void;
    closePopUp: () => void;
    popUpClassName: string;
}
interface StateProps {
    [key: string]: boolean;
}

type Props = OwnProps & StateProps;

interface IState {
    isNotifyShown: boolean;
    isLoaderShown: boolean;
    isDisplayPopUpModalShown: boolean;
}

const modalAniAndSuccContainer = (
    WrappedComponent: React.SFC<SFCmodulePopUpProps>
): any => {
    class ModalAniAndSuccContainer extends React.Component<Props, IState> {
        public state: IState = {
            isNotifyShown: false,
            isLoaderShown: false,
            isDisplayPopUpModalShown: this.props.modalPopUpsState[
                this.props.isPopUpShown
            ]
        };

        constructor(props: Props) {
            super(props);
        }

        public toggleDisplayPopUpModal = (): void => {
            this.props.togglePopUp();
        };

        public closeDisplayPopUpModal = (): void => {
            this.props.closePopUp();
        };

        private notifyUserOfSuccess = (arg: () => void): void => {
            this.setState(() => {
                return { isLoaderShown: false, isNotifyShown: true };
            });

            const timer: number = window.setTimeout(() => {
                this.setState(() => {
                    return { isNotifyShown: false };
                });
                this.closeDisplayPopUpModal();
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
            return (
                <WrappedComponent
                    toggleDisplayPopUpModal={() => {
                        this.toggleDisplayPopUpModal();
                    }}
                    headerText={this.props.headerText}
                    clickEvent={(
                        notifyUserOfSuccess: (arg: () => void) => void
                    ) => {
                        this.props.clickEvent(notifyUserOfSuccess);
                    }}
                    notifyUserOfSuccess={this.notifyUserOfSuccess}
                    dislayLoader={this.dislayLoader}
                />
            );
        };

        public componentWillReceiveProps = (nextProps: StateProps) => {
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
                        this.toggleDisplayPopUpModal();
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

    const mapStateToProps = (state: AppState) => {
        return { modalPopUpsState: state.modalPopUps };
    };

    return connect(mapStateToProps)(ModalAniAndSuccContainer);
};

export default modalAniAndSuccContainer;

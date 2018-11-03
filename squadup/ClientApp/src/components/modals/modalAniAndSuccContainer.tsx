import * as React from "react";
import ModalPopUp from "./modalPopUp";
// import UploadUserAndProjectImgContainer from "../images/uploadUserAndProjectImgContainer";
import { SFCmodulePopUpProps } from "./modalSmallPopUp";
interface IProps {
    isDisplayPopUpModalShown: boolean;
    toggleDisplayPopUpModal: () => void;
    closeDisplayPopUpModal: () => void;
    successText: string;
    headerText: string;
    clickEvent: (arg: (arg: () => void) => void) => void;
}

interface IState {
    isNotifyShown: boolean;
    isLoaderShown: boolean;
}

const modalAniAndSuccContainer = (
    WrappedComponent: React.SFC<SFCmodulePopUpProps>
): React.ComponentClass<IProps, IState> => {
    class ModalAniAndSuccContainer extends React.Component<IProps, IState> {
        public state: IState = { isNotifyShown: false, isLoaderShown: false };

        constructor(props: IProps) {
            super(props);
        }

        private notifyUserOfSuccess = (arg: () => void): void => {
            this.setState(() => {
                return {
                    isLoaderShown: false,
                    isNotifyShown: true
                };
            });

            const timer: number = window.setTimeout(() => {
                this.setState(() => {
                    return {
                        isNotifyShown: false
                    };
                });
                this.props.closeDisplayPopUpModal();
                arg();

                clearInterval(timer);
            }, 1500);
        };

        private dislayLoader = (): void => {
            this.setState(() => {
                return {
                    isLoaderShown: true
                };
            });
        };

        private renderWrappedComponent = (): React.ReactChild => {
            return (
                <WrappedComponent
                    toggleDisplayPopUpModal={() => {
                        this.props.toggleDisplayPopUpModal();
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

        public render(): React.ReactNode {
            return (
                <ModalPopUp
                    isDisplayPopUpModalShown={
                        this.props.isDisplayPopUpModalShown
                    }
                    clickEvent={this.props.toggleDisplayPopUpModal}
                    popUpClassName={"modal-small-popup"}
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

    return ModalAniAndSuccContainer;
};

export default modalAniAndSuccContainer;

import * as React from "react";
import ModalSmallPopUp from "./modalSmallPopUp";

interface IProps {
    toggleDisplayPopUpModal: boolean;
    toggleDisplayPopUpModal1: () => void;
    closeDisplayPopUpModal: () => void;
    successText: string;
    headerText: string;
    clickEvent: (notifyUserOfSuccess: (logOut: () => void) => void) => void;
}

interface WrappedComponent {
    toggleDisplayPopUpModal: boolean;
    toggleDisplayPopUpModal1: () => void;
    clickEvent: (notifyUserOfSuccess: (logOut: () => void) => void) => void;
    headerText: string;
    successText: string;
    notifyUserOfSuccess: (logOut: () => void) => void;
    isNotifyShown: boolean;
    dislayLoader: () => void;
    isLoaderShown: boolean;
    closeDisplayPopUpModal: () => void;
}

interface IState {
    isNotifyShown: boolean;
    isLoaderShown: boolean;
}

const modalAniAndSuccContainer = (
    WrappedComponent: React.SFC<WrappedComponent>
): any => {
    class ModalAniAndSuccContainer extends React.Component<IProps, IState> {
        public state: IState = { isNotifyShown: false, isLoaderShown: false };

        constructor(props: IProps) {
            super(props);
        }

        private notifyUserOfSuccess = (logOut: () => void): void => {
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
                logOut();

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

        public render(): React.ReactNode {
            return (
                <WrappedComponent
                    toggleDisplayPopUpModal={this.props.toggleDisplayPopUpModal}
                    toggleDisplayPopUpModal1={() => {
                        this.props.toggleDisplayPopUpModal1();
                    }}
                    closeDisplayPopUpModal={() => {
                        this.props.closeDisplayPopUpModal();
                    }}
                    headerText={"Are you sure you wanna log out?"}
                    successText={"You're now logged out!"}
                    clickEvent={(
                        notifyUserOfSuccess: (logOut: () => void) => void
                    ) => {
                        this.props.clickEvent(notifyUserOfSuccess);
                    }}
                    notifyUserOfSuccess={this.notifyUserOfSuccess}
                    dislayLoader={this.dislayLoader}
                    isLoaderShown={this.state.isLoaderShown}
                    isNotifyShown={this.state.isNotifyShown}
                />
            );
        }
    }

    return ModalAniAndSuccContainer;
};

export default modalAniAndSuccContainer(ModalSmallPopUp);

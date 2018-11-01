import * as React from "react";

import ModalContainerBackground from "../modals/modalContainerBackground";
import ModalUploadPopUp from "../modals/modalUploadPopUp";
import UploadImgFile from "../forms/uploadFile/UploadImgFile";

interface IState {
    toggleDisplayPopUpModal: boolean;
}

interface IProps {}

const uploadUserAndProjectImgWrapper = (WrappedComponent: any) => {
    class uploadUserAndProjectImgContainer extends React.Component<
        IProps,
        IState
    > {
        public state: IState = { toggleDisplayPopUpModal: false };

        constructor(props: IProps) {
            super(props);
        }

        public toggleDisplayPopUpModal = (): void => {
            this.setState(prevState => {
                return {
                    toggleDisplayPopUpModal: prevState.toggleDisplayPopUpModal
                        ? false
                        : true
                };
            });
        };

        public closePopUpModal = (): void => {
            this.setState(() => {
                return {
                    toggleDisplayPopUpModal: false
                };
            });
        };

        public render(): JSX.Element {
            return (
                <React.Fragment>
                    <WrappedComponent
                        toggleDisplayPopUpModal={this.toggleDisplayPopUpModal}
                    />
                    <ModalContainerBackground
                        toggleDisplayPopUpModal={
                            this.state.toggleDisplayPopUpModal
                        }
                    >
                        <ModalUploadPopUp
                            clickEvent={this.toggleDisplayPopUpModal}
                        >
                            <UploadImgFile
                                isPopUpModalShown={
                                    this.state.toggleDisplayPopUpModal
                                }
                                toggleDisplayPopUpModal={
                                    this.toggleDisplayPopUpModal
                                }
                                closePopUpModal={this.closePopUpModal}
                            />
                        </ModalUploadPopUp>
                    </ModalContainerBackground>
                </React.Fragment>
            );
        }
    }
    return uploadUserAndProjectImgContainer;
};

export default uploadUserAndProjectImgWrapper;

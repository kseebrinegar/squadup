import * as React from "react";

import ModalContainerBackground from "../modals/modalContainerBackground";
import ModalUploadPopUp from "../modals/modalUpload";
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
        public state: IState = {
            toggleDisplayPopUpModal: false
        };

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

        public render(): JSX.Element {
            return (
                <main className="upload-user-and-project-img-wrapper">
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
                            />
                        </ModalUploadPopUp>
                    </ModalContainerBackground>
                </main>
            );
        }
    }
    return uploadUserAndProjectImgContainer;
};

export default uploadUserAndProjectImgWrapper;

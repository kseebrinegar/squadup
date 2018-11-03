import * as React from "react";

interface IState {
    isDisplayPopUpModalShown: boolean;
}

interface IProps {}

const uploadUserAndProjectImgWrapper = (WrappedComponent: any) => {
    class uploadUserAndProjectImgContainer extends React.Component<
        IProps,
        IState
    > {
        public state: IState = { isDisplayPopUpModalShown: false };

        constructor(props: IProps) {
            super(props);
        }

        public toggleDisplayPopUpModal = (): void => {
            this.setState(prevState => {
                return {
                    isDisplayPopUpModalShown: prevState.isDisplayPopUpModalShown
                        ? false
                        : true
                };
            });
        };

        public closePopUpModal = (): void => {
            this.setState(() => {
                return {
                    isDisplayPopUpModalShown: false
                };
            });
        };

        public render(): JSX.Element {
            return (
                <WrappedComponent
                    toggleDisplayPopUpModal={this.toggleDisplayPopUpModal}
                    isDisplayPopUpModalShown={
                        this.state.isDisplayPopUpModalShown
                    }
                    closePopUpModal={this.closePopUpModal}
                />
            );
        }
    }
    return uploadUserAndProjectImgContainer;
};

export default uploadUserAndProjectImgWrapper;

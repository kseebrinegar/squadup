import * as React from "react";

interface IState {}

interface IProps {}

const uploadUserAndProjectImgWrapper = (WrappedComponent: any) =>
    class uploadUserAndProjectImgContainer extends React.Component<
        IProps,
        IState
    > {
        public state: IState = {};

        constructor(props: IProps) {
            super(props);
        }

        public render() {
            return (
                <div className="meow">
                    <WrappedComponent />
                </div>
            );
        }
    };

export default uploadUserAndProjectImgWrapper;

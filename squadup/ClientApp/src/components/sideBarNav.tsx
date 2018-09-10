import * as React from "react";

interface IState {}

interface IProps {}

class SideBarNav extends React.Component<IProps, IState> {
    public state: IState = {};

    constructor(props: IProps) {
        super(props);
    }

    public render(): JSX.Element {
        return <div className="sidebar" />;
    }
}

export default SideBarNav;

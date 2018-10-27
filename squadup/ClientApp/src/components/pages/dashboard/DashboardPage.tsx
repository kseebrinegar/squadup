import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import dashboardOnLoad from "../../../actions/dashboardOnLoad";

interface IProps {
    dashboardOnLoad: () => {};
}

interface IState {}
class DashbaordPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public componentWillMount() {
        this.props.dashboardOnLoad();
    }

    public render() {
        return <main className="dashboard" />;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ dashboardOnLoad }, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(DashbaordPage);

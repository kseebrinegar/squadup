import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

interface IProps {}

interface IState {}
class DashbaordPage extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    }

    public componentWillMount() {}

    public render() {
        return <main className="dashboard" />;
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default connect(
    null,
    mapDispatchToProps
)(DashbaordPage);

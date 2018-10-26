import * as React from "react";
import { Link } from "react-router-dom";
/*import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../store/types";*/

interface IState {}

interface IProps {
    iconData: {
        containerClassName: string;
        className: string;
        colorAndSizeClassName: string;
        counter?: undefined | number;
        iconInfoClassName?: string;
        infoName?: string;
        linkAddress?: undefined | string;
        clickEvent?: () => void | undefined;
    };
}

class Icons extends React.Component<IProps, IState> {
    public state: IState = {};

    constructor(props: IProps) {
        super(props);
    }

    public customizeIcon = (): React.ReactNode => {
        const {
            className,
            colorAndSizeClassName,
            linkAddress,
            clickEvent
        } = this.props.iconData;

        if (linkAddress) {
            return (
                <Link
                    to={linkAddress}
                    className={`${colorAndSizeClassName} fa fa-fw fa ${className}`}
                    aria-hidden="true"
                >
                    {" "}
                </Link>
            );
        } else if (clickEvent) {
            return (
                <p
                    onClick={clickEvent}
                    className={`${colorAndSizeClassName} fa fa-fw fa ${className}`}
                    aria-hidden="true"
                />
            );
        } else {
            return (
                <p
                    className={`${colorAndSizeClassName} fa fa-fw fa ${className}`}
                    aria-hidden="true"
                />
            );
        }
    };

    public renderIfIconCounterExists = (): React.ReactNode | void => {
        const { counter } = this.props.iconData;

        if (counter) {
            return <p className="icon-counter">{counter}</p>;
        }
    };

    public renderIfIconInfoMessageExists = (): React.ReactNode | void => {
        const { iconInfoClassName, infoName } = this.props.iconData;

        if (iconInfoClassName) {
            return (
                <div className={`icon-info ${iconInfoClassName}`}>
                    <div className="icon-triangle" />
                    <p>{infoName}</p>
                </div>
            );
        }
    };

    public renderIcon = (): React.ReactNode => {
        const { containerClassName } = this.props.iconData;
        return (
            <div className={`icon-container ${containerClassName}`}>
                {this.customizeIcon()}
                {this.renderIfIconCounterExists()}
                {this.renderIfIconInfoMessageExists()}
            </div>
        );
    };

    public render(): React.ReactNode {
        return this.renderIcon();
    }
}

export default Icons;

/* 
*/

/*const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = (state: AppState) => {
    return { isUserLoggedIn: state.auth };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Icons);*/

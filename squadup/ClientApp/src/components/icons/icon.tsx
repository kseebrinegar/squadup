import * as React from "react";
import { Link } from "react-router-dom";
/*import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../store/types";*/

interface IState {}

interface IProps {
    iconData: {
        messageCount?: number;
        containerClassName: string;
        className: string;
        colorAndSizeClassName: string;
        iconCount?: undefined | number;
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

    public renderIfMessageCountExists = () => {
        const { messageCount } = this.props.iconData;

        if (!messageCount) {
            return;
        }

        return (
            <div
                className={
                    messageCount <= 9
                        ? "new-messages-count new-messages-count--one-digit"
                        : "new-messages-count new-messages-count--two-digit"
                }
            >
                <p>{messageCount}</p>
            </div>
        );
    };

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

    public howToDisplayCounterIcon = (counter: number): string => {
        const unit: string = counter <= 999999 ? "k" : "M";

        const round = (value: number, precision: number): number => {
            const multiplier = Math.pow(10, precision || 0);
            return Math.floor(value * multiplier) / multiplier;
        };

        const fixed = (toFixed: number) => {
            const divideCounter: number =
                counter / (counter <= 999999 ? 1000 : 1000000);
            return round(parseFloat(divideCounter.toFixed(toFixed)), 1) + unit;
        };

        if (counter < 999) {
            return counter.toString();
        } else if (counter > 999 && counter <= 99999) {
            return fixed(3);
        } else if (counter > 99999 && counter <= 999999) {
            return fixed(2);
        } else if (counter > 999999 && counter <= 99999999) {
            return fixed(6);
        } else {
            return fixed(5);
        }
    };

    public renderIfIconCounterExists = (): React.ReactNode | void => {
        const { iconCount } = this.props.iconData;

        if (iconCount || iconCount === 0) {
            const count = this.howToDisplayCounterIcon(iconCount);
            return <p className="icon-counter">{count}</p>;
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
                {this.renderIfMessageCountExists()}
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

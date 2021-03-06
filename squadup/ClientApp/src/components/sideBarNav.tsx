import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as uuid from "uuid";

import sideBarNavActions from "../actions/sideBarNav";
import modalPopUpActions from "../actions/modalPopUp";
import { AppState } from "../store/types";
import ProjectAndUserImg from "./images/projectAndUserImg";
import UserAndProjectImgCta from "./images/userAndProjectImgCta";
import Icon from "./icons/icon";
import UploadImgFile from "./forms/uploadFile/UploadImgFile";
import LoaderAnimation from "./loaderAnimations/loaderAnimation";

interface DispatchProps {
    requestSideBarIconsData: (callBack: () => void) => Function;
    requestAllSideBarData: (callBack: () => void) => Function;
    toggleSideBarNavImgPopUp: () => void;
}

interface StateProps {
    userProfileLikesCount: number;
    userProfileViewsCount: number;
    userIsfollowingCount: number;
    userProjectsCount: number;
    userName: string;
    userImg: string;
}

interface State {
    [propName: string]: boolean | number;
}

type Props = DispatchProps & StateProps;

type navList = Record<string, string | number>[];

class SideBarNav extends React.Component<Props, State> {
    public state: State = {
        isSideBarHidden: false,
        isInboxNavHidden: true,
        isComponentLoading: true
    };

    constructor(props: Props) {
        super(props);
    }

    public toggleSideBarAndNav = (propName: keyof State): void => {
        this.setState(prevState => {
            return { [propName]: prevState[propName] ? false : true };
        });
    };

    public renderInboxNavList = (): JSX.Element[] => {
        const navListData: navList = [
            { linkAddress: "inbox/allmessages", linkName: "All Messages" },
            {
                linkAddress: "inbox/privatemessages",
                linkName: "Private Messages"
            },
            { linkAddress: "inbox/teammessages", linkName: "Team Messages" },
            { linkAddress: "inbox/applications", linkName: "Applications" },
            { linkAddress: "inbox/invatations", linkName: "Invatations" }
        ];

        return navListData.map(item => {
            return (
                <li key={uuid()} className="inbox-nav-item">
                    <Link to={item.linkAddress as string}>{item.linkName}</Link>
                </li>
            );
        });
    };

    public renderNavList = (): JSX.Element[] => {
        const navListData: navList = [
            { typeOfList: 1, linkAddress: "profile", linkName: "Profile" },
            { typeOfList: 2, linkName: "Inbox" },
            { typeOfList: 3 },
            { typeOfList: 1, linkAddress: "following", linkName: "Following" },
            { typeOfList: 1, linkAddress: "projects", linkName: "Projects" },
            { typeOfList: 1, linkAddress: "account", linkName: "Account" }
        ];

        return navListData.map(item => {
            if (item.typeOfList === 1) {
                return (
                    <li key={uuid()} className="sidebar-nav-item">
                        <Link to={item.linkAddress as string}>
                            {item.linkName}
                        </Link>
                    </li>
                );
            } else if (item.typeOfList === 2) {
                return (
                    <li
                        key={uuid()}
                        className="sidebar-nav-item sidebar-nav-inbox-item"
                    >
                        <a
                            onClick={() => {
                                this.toggleSideBarAndNav("isInboxNavHidden");
                            }}
                        >
                            {item.linkName}
                            <span
                                className={`fa fa-fw ${
                                    this.state.isInboxNavHidden
                                        ? "fa-caret-down"
                                        : "fa-caret-up"
                                }`}
                                aria-hidden="true"
                            />
                        </a>
                    </li>
                );
            } else {
                return (
                    <li
                        key={uuid()}
                        className={`${
                            this.state.isInboxNavHidden
                                ? "inbox-nav--unexpanded"
                                : "inbox-nav--expanded"
                        } inbox-nav sidebar-nav-item`}
                    >
                        <ul className="inbox-nav-items">
                            {this.renderInboxNavList()}
                        </ul>
                    </li>
                );
            }
        });
    };

    public windowResize = (): void => {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                this.setState(() => {
                    return {
                        isSideBarHidden: false
                    };
                });
            }
        });
    };

    public onComponentLoadGetData = (): void => {
        const defaultUserImg = "images/default-user-img.jpg";
        const defaultUserName = "";

        if (
            this.props.userImg === defaultUserImg &&
            this.props.userName === defaultUserName
        ) {
            this.props.requestAllSideBarData(() => {
                this.setState(() => {
                    return { isComponentLoading: false };
                });
            });
            return;
        }

        this.props.requestSideBarIconsData(() => {
            this.setState(() => {
                return { isComponentLoading: false };
            });
        });
    };

    public componentWillMount(): void {
        this.windowResize();
        this.onComponentLoadGetData();
    }

    public render(): JSX.Element {
        type iconData = {
            containerClassName: string;
            className: string;
            colorAndSizeClassName: string;
            iconCount: number;
            iconInfoClassName: string;
            infoName: string;
        };

        const iconData1: iconData = {
            containerClassName: "heart-icon",
            className: "fa-heart",
            colorAndSizeClassName: "icon-black-md",
            iconCount: this.props.userProfileLikesCount,
            iconInfoClassName: "icon-info-likes",
            infoName: "Likes"
        };
        const iconData2: iconData = {
            containerClassName: "eye-icon",
            className: "fa-eye",
            colorAndSizeClassName: "icon-black-md",
            iconCount: this.props.userProfileViewsCount,
            iconInfoClassName: "icon-info-views",
            infoName: "Views"
        };
        const iconData3: iconData = {
            containerClassName: "user-plus-icon",
            className: " fa-user-plus",
            colorAndSizeClassName: "icon-black-md",
            iconCount: this.props.userIsfollowingCount,
            iconInfoClassName: "icon-info-following",
            infoName: "Following"
        };
        const iconData4: iconData = {
            containerClassName: "object-group-icon",
            className: "fa-object-group",
            colorAndSizeClassName: "icon-black-md",
            iconCount: this.props.userProjectsCount,
            iconInfoClassName: "icon-info-projects",
            infoName: "Projects"
        };

        return (
            <React.Fragment>
                <UploadImgFile
                    popUpClassName={"modal-upload-popup"}
                    isPopUpShown={"isSideBarNavPopUpShown"}
                    togglePopUp={"toggleSideBarNavImgPopUp"}
                    successText={"User image uploaded!"}
                />

                <div className="sidebar-outer-container">
                    <div className="sidebar-inner-container">
                        <div className="sidebar-toggle-container">
                            <div
                                onClick={() => {
                                    this.toggleSideBarAndNav("isSideBarHidden");
                                }}
                                className="hamburger-icon icon-container"
                            >
                                <p
                                    className="fa fa-bars icon-white-lg"
                                    aria-hidden="true"
                                />
                            </div>
                        </div>

                        <div
                            style={{
                                transform: this.state.isSideBarHidden
                                    ? "translateX(-20rem)"
                                    : "translateX(0rem)"
                            }}
                            className="sidebar"
                        >
                            {this.state.isComponentLoading ? (
                                <LoaderAnimation displayLoader={true} />
                            ) : (
                                <React.Fragment>
                                    <ProjectAndUserImg
                                        userName={this.props.userName}
                                        img={this.props.userImg}
                                    >
                                        <UserAndProjectImgCta
                                            toggleDisplayPopUpModal={() => {
                                                this.props.toggleSideBarNavImgPopUp();
                                            }}
                                        />
                                    </ProjectAndUserImg>
                                    <div className="sidebar-nav-icons-container">
                                        <Icon iconData={iconData1} />
                                        <Icon iconData={iconData2} />
                                        <Icon iconData={iconData3} />
                                        <Icon iconData={iconData4} />
                                    </div>
                                    <nav className="sidebar-nav">
                                        <ul className="sidebar-nav-items">
                                            {this.renderNavList()}
                                        </ul>
                                    </nav>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    return {
        userProfileLikesCount: state.basicUserInfo.userProfileLikesCount,
        userProfileViewsCount: state.basicUserInfo.userProfileViewsCount,
        userIsfollowingCount: state.basicUserInfo.userIsfollowingCount,
        userProjectsCount: state.basicUserInfo.userProjectsCount,
        userName: state.basicUserInfo.userName,
        userImg: state.basicUserInfo.imgSrc
    };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
    return bindActionCreators(
        {
            requestSideBarIconsData: sideBarNavActions.requestSideBarIconsData,
            requestAllSideBarData: sideBarNavActions.requestAllSideBarData,
            toggleSideBarNavImgPopUp: modalPopUpActions.toggleSideBarNavImgPopUp
        },
        dispatch
    );
};

export default connect<StateProps, DispatchProps, {}, AppState>(
    mapStateToProps,
    mapDispatchToProps
)(SideBarNav);

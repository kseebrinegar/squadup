import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as uuid from "uuid";

import sideBarNavIcons from "../actions/sideBarNavIcons";
import UploadUserAndProjectImgContainer from "./images/uploadUserAndProjectImgContainer";
import ProjectAndUserImg from "./images/projectAndUserImg";
import UserAndProjectImgCta from "./images/userAndProjectImgCta";
import Icon from "./icons/icon";

interface IState {
    [propName: string]: boolean;
}

interface IProps {
    toggleDisplayPopUpModal: () => {};
    userImg: string;
    sideBarNavIcons: () => {};
}

type navList = Record<string, string | number>[];

class SideBarNav extends React.Component<IProps, IState> {
    public state: IState = {
        isSideBarHidden: false,
        isInboxNavHidden: true
    };

    constructor(props: IProps) {
        super(props);
    }

    public toggleSideBarAndNav = (propName: keyof IState): void => {
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

    componentWillMount(): void {
        this.windowResize();
        this.props.sideBarNavIcons();
    }

    public render(): JSX.Element {
        type iconData = {
            containerClassName: string;
            className: string;
            colorAndSizeClassName: string;
            counter: number;
            iconInfoClassName: string;
            infoName: string;
        };

        const iconData1: iconData = {
            containerClassName: "heart-icon",
            className: "fa-heart",
            colorAndSizeClassName: "icon-black-md",
            counter: 2.1,
            iconInfoClassName: "icon-info-likes",
            infoName: "Likes"
        };
        const iconData2: iconData = {
            containerClassName: "eye-icon",
            className: "fa-eye",
            colorAndSizeClassName: "icon-black-md",
            counter: 31,
            iconInfoClassName: "icon-info-views",
            infoName: "Views"
        };
        const iconData3: iconData = {
            containerClassName: "user-plus-icon",
            className: " fa-user-plus",
            colorAndSizeClassName: "icon-black-md",
            counter: 998,
            iconInfoClassName: "icon-info-following",
            infoName: "Following"
        };
        const iconData4: iconData = {
            containerClassName: "object-group-icon",
            className: "fa-object-group",
            colorAndSizeClassName: "icon-black-md",
            counter: 3,
            iconInfoClassName: "icon-info-projects",
            infoName: "Projects"
        };

        return (
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
                        <ProjectAndUserImg
                            userName={"xxxxxblissment1xxxxx"}
                            img={this.props.userImg}
                        >
                            <UserAndProjectImgCta
                                toggleDisplayPopUpModal={
                                    this.props.toggleDisplayPopUpModal
                                }
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
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators({ sideBarNavIcons }, dispatch);
};

const sidebarnav = connect(
    null,
    mapDispatchToProps
)(SideBarNav);

export default UploadUserAndProjectImgContainer(sidebarnav);

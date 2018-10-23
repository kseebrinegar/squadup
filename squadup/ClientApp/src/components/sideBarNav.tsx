import * as React from "react";
import { Link } from "react-router-dom";

import * as uuid from "uuid";

import UploadUserAndProjectImgContainer from "./images/uploadUserAndProjectImgContainer";
import ProjectAndUserImg from "./images/projectAndUserImg";
import UserAndProjectImgCta from "./images/userAndProjectImgCta";

interface IState {
    [propName: string]: boolean;
}

interface IProps {
    toggleDisplayPopUpModal: () => {};
    userImg: string;
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
    }

    public render(): JSX.Element {
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
                            <div className="icon-container heart-icon">
                                <p
                                    className="icon-black-md fa fa-fw fa fa-heart"
                                    aria-hidden="true"
                                />
                                <p className="icon-counter">2.1k</p>
                                <div className="icon-info icon-info-likes">
                                    <div className="icon-triangle" />
                                    <p>Likes</p>
                                </div>
                            </div>
                            <div className="icon-container eye-icon">
                                <p
                                    className="icon-black-md fa fa-fw fa fa-eye"
                                    aria-hidden="true"
                                />
                                <p className="icon-counter">31</p>
                                <div className="icon-info icon-info-views">
                                    <div className="icon-triangle" />
                                    <p>Views</p>
                                </div>
                            </div>
                            <div className="icon-container user-plus-icon">
                                <p
                                    className="icon-black-md fa fa-fw fa fa-user-plus"
                                    aria-hidden="true"
                                />
                                <p className="icon-counter">998</p>
                                <div className="icon-info icon-info-following">
                                    <div className="icon-triangle" />
                                    <p>Following</p>
                                </div>
                            </div>
                            <div className="icon-container object-group-icon">
                                <p
                                    className="icon-black-md fa fa-fw fa fa-object-group"
                                    aria-hidden="true"
                                />
                                <p className="icon-counter">3</p>
                                <div className="icon-info icon-info-projects">
                                    <div className="icon-triangle" />
                                    <p>Projects</p>
                                </div>
                            </div>
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

export default UploadUserAndProjectImgContainer(SideBarNav);

import * as React from "react";
import { Link } from "react-router-dom";

interface IState {
    isSideBarHidden: boolean;
    isInboxNavHidden: boolean;
}

interface IProps {}

class SideBarNav extends React.Component<IProps, IState> {
    public state: IState = {
        isSideBarHidden: false,
        isInboxNavHidden: false
    };

    constructor(props: IProps) {
        super(props);
    }

    public toggleSideBar = () => {
        this.setState(prevState => {
            return {
                isSideBarHidden: prevState.isSideBarHidden ? false : true
            };
        });
    };

    public toggleInboxNav = () => {
        this.setState(prevState => {
            return {
                isInboxNavHidden: prevState.isInboxNavHidden ? false : true
            };
        });
    };

    componentWillMount() {
        window.addEventListener("resize", () => {
            if (window.innerWidth >= 768) {
                this.setState(() => {
                    return {
                        isSideBarHidden: false
                    };
                });
            }
        });
    }

    public render(): JSX.Element {
        const sideBarsCurrentPosition = this.state.isSideBarHidden
            ? "translateX(-20rem)"
            : "translateX(0rem)";
        const carrotIconsDirection = this.state.isInboxNavHidden
            ? "fa-caret-up"
            : "fa-caret-down";
        return (
            <div className="sidebar-outer-container">
                <div className="sidebar-inner-container">
                    <div className="sidebar-toggle-container">
                        <div
                            onClick={this.toggleSideBar}
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
                            transform: sideBarsCurrentPosition,
                            transition: "transform 0.5s ease-out"
                        }}
                        className="sidebar"
                    >
                        <div className="users-img-container">
                            <img src="/images/default-user-img.jpg" />
                        </div>
                        <p className="sidebar-users-name">Harry Potter</p>
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
                                <li className="sidebar-nav-item">
                                    <Link to="">Profile</Link>
                                </li>
                                <li className="sidebar-nav-item">
                                    <Link
                                        onClick={this.toggleInboxNav}
                                        to="/dashboard"
                                    >
                                        Inbox
                                        <span
                                            className={`fa fa-fw ${carrotIconsDirection}`}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                    <nav className="inbox-nav">
                                        <ul className="inbox-nav-items">
                                            <li className="inbox-nav-items">
                                                <Link to="">All Messages</Link>
                                            </li>
                                            <li className="inbox-nav-items">
                                                <Link to="">
                                                    Private Messages
                                                </Link>
                                            </li>
                                            <li className="inbox-nav-items">
                                                <Link to="">Team Messages</Link>
                                            </li>
                                            <li className="inbox-nav-items">
                                                <Link to="">Applications</Link>
                                            </li>
                                            <li className="inbox-nav-items">
                                                <Link to="">Invatations</Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </li>
                                <li className="sidebar-nav-item">
                                    <Link to="">Following</Link>
                                </li>
                                <li className="sidebar-nav-item">
                                    <Link to="">Projects</Link>
                                </li>
                                <li className="sidebar-nav-item">
                                    <Link to="">Account</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBarNav;

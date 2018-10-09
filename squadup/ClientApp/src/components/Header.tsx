import * as React from "react";
import * as uuid from "uuid";
import { AppState } from "../store/types";
import { NavLink } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "./buttons/button";
import auth from "../actions/auth";
import ModalContainerBackground from "./modals/modalContainerBackground";
import ModalBigPopUp from "./modals/modalBigPopUp";
import ModalSmallPopUp from "./modals/modalSmallPopUp";
import SignUpForm from "./forms/authForms/signup";
import LoginForm from "./forms/authForms/login";
import ForgotPassword from "./forms/authForms/forgotPassword";

interface IHeaderState {
    aboutLinkAffect: [boolean, boolean, boolean];
    eventsLinkAffect: [boolean, boolean, boolean];
    peopleLinkAffect: [boolean, boolean, boolean];
    projectsLinkAffect: [boolean, boolean, boolean];
    loginOrSignUpOrForgotPasswordForm: string;
    toggleNavDropDownMenu: boolean;
    toggleDisplayBigPopUpModal: boolean;
    toggleDisplaySmallPopUpModal: boolean;
    isUserLoggedIn: boolean;
}

interface IHeaderProps {
    isUserLoggedIn: boolean;
    logOut: () => void;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    public state: IHeaderState = {
        aboutLinkAffect: [true, false, false],
        eventsLinkAffect: [true, false, false],
        peopleLinkAffect: [true, false, false],
        projectsLinkAffect: [true, false, false],
        loginOrSignUpOrForgotPasswordForm: "login",
        toggleNavDropDownMenu: false,
        toggleDisplayBigPopUpModal: false,
        toggleDisplaySmallPopUpModal: false,
        isUserLoggedIn: this.props.isUserLoggedIn
    };

    constructor(props: IHeaderProps) {
        super(props);
        this.toggleDisplaySmallPopUpModal = this.toggleDisplaySmallPopUpModal.bind(
            this
        );
    }

    public darkenActiveNavLinkForPage = (): void => {
        const urlPath: string = window.location.pathname;
        this.setState(() => {
            return {
                aboutLinkAffect:
                    urlPath === "/about"
                        ? [false, false, true]
                        : [true, false, false],
                eventsLinkAffect:
                    urlPath === "/events"
                        ? [false, false, true]
                        : [true, false, false],
                peopleLinkAffect:
                    urlPath === "/people"
                        ? [false, false, true]
                        : [true, false, false],
                projectsLinkAffect:
                    urlPath === "/projects"
                        ? [false, false, true]
                        : [true, false, false]
            };
        });
    };

    public manuallyChooseLoginOrSignUpOrForgotPasswordForm = (
        whatFormToClose: string
    ): void => {
        this.setState(() => {
            return {
                loginOrSignUpOrForgotPasswordForm: whatFormToClose
            };
        });
    };

    public activeNavLinkForPage = (): void => {
        const urlPath: string = window.location.pathname;
        this.setState(() => {
            return {
                aboutLinkAffect:
                    urlPath === "/about"
                        ? [false, true, false]
                        : [true, false, false],
                eventsLinkAffect:
                    urlPath === "/events"
                        ? [false, true, false]
                        : [true, false, false],
                peopleLinkAffect:
                    urlPath === "/people"
                        ? [false, true, false]
                        : [true, false, false],
                projectsLinkAffect:
                    urlPath === "/projects"
                        ? [false, true, false]
                        : [true, false, false]
            };
        });
    };

    public removeActiveLink = (): void => {
        this.setState(() => {
            return {
                aboutLinkAffect: [true, false, false],
                eventsLinkAffect: [true, false, false],
                peopleLinkAffect: [true, false, false],
                projectsLinkAffect: [true, false, false]
            };
        });
    };

    public toggleNavDropDownMenu = (): void => {
        this.setState(prevState => {
            return {
                toggleNavDropDownMenu: prevState.toggleNavDropDownMenu
                    ? false
                    : true
            };
        });
    };

    public toggleDisplaySmallPopUpModal = (): void => {
        this.setState(prevState => {
            return {
                toggleDisplaySmallPopUpModal: prevState.toggleDisplaySmallPopUpModal
                    ? false
                    : true
            };
        });
    };

    public toggleDisplayBigPopUpModal = (buttonClicked: string): void => {
        this.setState(prevState => {
            return {
                toggleDisplayBigPopUpModal: prevState.toggleDisplayBigPopUpModal
                    ? false
                    : true,
                loginOrSignUpOrForgotPasswordForm: buttonClicked
            };
        });
    };

    public closeDisplayPopUpModal = (): void => {
        this.setState(() => {
            return {
                toggleDisplayBigPopUpModal: false
            };
        });
    };

    public renderNavList = (): JSX.Element[] => {
        type NavListType = {
            url: string;
            name: string;
            class: () => string;
        }[];
        const unActiveLinkClass: string = "is-active-nav-link--hover";
        const activeLinkClasses: string =
            "is-active-nav-link is-active-nav-link--hover";
        const acitveDarkLinkClasses: string =
            "is-active-nav-link--dark is-active-nav-link--hover";
        const navList: NavListType = [
            {
                url: "/events",
                name: "Events",
                class: () => {
                    if (this.state.eventsLinkAffect[0]) {
                        return unActiveLinkClass;
                    } else if (this.state.eventsLinkAffect[1]) {
                        return activeLinkClasses;
                    } else {
                        return acitveDarkLinkClasses;
                    }
                }
            },
            {
                url: "/projects",
                name: "Projects",
                class: () => {
                    if (this.state.projectsLinkAffect[0]) {
                        return unActiveLinkClass;
                    } else if (this.state.projectsLinkAffect[1]) {
                        return activeLinkClasses;
                    } else {
                        return acitveDarkLinkClasses;
                    }
                }
            },
            {
                url: "/people",
                name: "People",
                class: () => {
                    if (this.state.peopleLinkAffect[0]) {
                        return unActiveLinkClass;
                    } else if (this.state.peopleLinkAffect[1]) {
                        return activeLinkClasses;
                    } else {
                        return acitveDarkLinkClasses;
                    }
                }
            },
            {
                url: "/about",
                name: "About",
                class: () => {
                    if (this.state.aboutLinkAffect[0]) {
                        return unActiveLinkClass;
                    } else if (this.state.aboutLinkAffect[1]) {
                        return activeLinkClasses;
                    } else {
                        return acitveDarkLinkClasses;
                    }
                }
            }
        ];
        return navList.map(item => {
            return (
                <li
                    key={uuid()}
                    onMouseEnter={this.darkenActiveNavLinkForPage}
                    className="nav-list-item"
                >
                    <NavLink to={item.url}>{item.name}</NavLink>
                    <div className={item.class()} />
                </li>
            );
        });
    };

    public renderButtonsOrIconsIfLoggedIn = (): JSX.Element => {
        if (this.state.isUserLoggedIn) {
            return (
                <div className="login-signup-and-icon-container">
                    <div className="icon-container envelope-icon">
                        <div className="new-messages-count">
                            <p>9+</p>
                        </div>
                        <NavLink
                            to="/"
                            className="icon-white-md fa fa-fw fa-envelope"
                            aria-hidden="true"
                        >
                            {" "}
                        </NavLink>
                        <div className="icon-info icon-info-inbox">
                            <div className="icon-triangle" />
                            <p>Inbox</p>
                        </div>
                    </div>

                    <div className="icon-container user-icon">
                        <NavLink
                            to="/"
                            className="icon-white-md fa fa-fw fa-user"
                            aria-hidden="true"
                        >
                            {" "}
                        </NavLink>
                        <div className="icon-info icon-info-dashboard">
                            <div className="icon-triangle" />
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <div
                        className="icon-container sign-out-icon"
                        onClick={this.toggleDisplaySmallPopUpModal}
                    >
                        <NavLink
                            to="/"
                            className="icon-white-md fa fa-fw fa-sign-out-alt"
                            aria-hidden="true"
                        >
                            {" "}
                        </NavLink>
                        <div className="icon-info icon-info-logout">
                            <div className="icon-triangle" />
                            <p>Logout</p>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="login-signup-and-icon-container">
                <Button
                    clickEvent={() => {
                        this.toggleDisplayBigPopUpModal("login");
                    }}
                    text={"LOG IN"}
                    type={"button"}
                    classes={"btn-primary btn-sm"}
                />
                <Button
                    clickEvent={() => {
                        this.toggleDisplayBigPopUpModal("signup");
                    }}
                    text={"SIGN UP"}
                    type={"button"}
                    classes={"btn-primary btn-sm"}
                />
            </div>
        );
    };

    public logOut = (): void => {
        this.toggleDisplaySmallPopUpModal();
        this.props.logOut();
    };

    public chooseFormToShow = (): JSX.Element => {
        if (this.state.loginOrSignUpOrForgotPasswordForm === "signup") {
            return (
                <SignUpForm
                    closeDisplayPopUpModule={() => {
                        this.closeDisplayPopUpModal();
                    }}
                    manuallyChooseLoginOrSignUpOrForgotPasswordForm={(
                        whatFormToClose: string
                    ) => {
                        this.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                            whatFormToClose
                        );
                    }}
                />
            );
        } else if (this.state.loginOrSignUpOrForgotPasswordForm === "login") {
            return (
                <LoginForm
                    closeDisplayPopUpModule={() => {
                        this.closeDisplayPopUpModal();
                    }}
                    manuallyChooseLoginOrSignUpOrForgotPasswordForm={(
                        whatFormToClose: string
                    ) => {
                        this.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                            whatFormToClose
                        );
                    }}
                />
            );
        } else {
            return (
                <ForgotPassword
                    closeDisplayPopUpModule={() => {
                        this.closeDisplayPopUpModal();
                    }}
                    manuallyChooseLoginOrSignUpOrForgotPasswordForm={(
                        whatFormToClose: string
                    ) => {
                        this.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                            whatFormToClose
                        );
                    }}
                />
            );
        }
    };

    public componentWillReceiveProps(nextProps: {
        isUserLoggedIn: boolean;
        logOut: Function;
    }): void {
        if (this.state.isUserLoggedIn != nextProps.isUserLoggedIn) {
            this.setState({
                isUserLoggedIn: nextProps.isUserLoggedIn
            });
        }
    }

    public componentDidMount() {
        this.activeNavLinkForPage();
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <ModalContainerBackground
                    toggleDisplayPopUpModal={
                        this.state.toggleDisplayBigPopUpModal
                    }
                >
                    <ModalBigPopUp
                        clickEvent={() => {
                            this.toggleDisplayBigPopUpModal("login");
                        }}
                    >
                        {this.chooseFormToShow()}
                    </ModalBigPopUp>
                </ModalContainerBackground>

                <ModalContainerBackground
                    toggleDisplayPopUpModal={
                        this.state.toggleDisplaySmallPopUpModal
                    }
                >
                    <ModalSmallPopUp
                        toggleDisplaySmallPopUpModal={() => {
                            this.toggleDisplaySmallPopUpModal();
                        }}
                        headerText={"Are you sure you wanna log out?"}
                        clickEvent={() => {
                            this.logOut();
                        }}
                    />
                </ModalContainerBackground>

                <header
                    id="header"
                    className={
                        this.state.toggleNavDropDownMenu
                            ? "is-expanded-header-drop-down-menu"
                            : "is-unexpanded-header-drop-down-menu"
                    }
                >
                    <NavLink to="/" className="logo-container">
                        <img
                            onClick={this.removeActiveLink}
                            className="logo"
                            src="./images/logo.png"
                        />
                    </NavLink>
                    <nav className="nav">
                        <ul
                            onMouseLeave={this.activeNavLinkForPage}
                            onClick={this.activeNavLinkForPage}
                            className="nav-list"
                        >
                            {this.renderNavList()}
                        </ul>
                    </nav>
                    {this.renderButtonsOrIconsIfLoggedIn()}
                    <div
                        onClick={this.toggleNavDropDownMenu}
                        className="hamburger-icon icon-container"
                    >
                        <p
                            className="fa fa-bars icon-white-lg"
                            aria-hidden="true"
                        />
                    </div>
                </header>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            logOut: auth.logOut
        },
        dispatch
    );

const mapStateToProps = (state: AppState) => ({
    isUserLoggedIn: state.auth
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

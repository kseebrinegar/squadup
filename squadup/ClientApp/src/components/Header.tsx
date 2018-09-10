import * as React from "react";
import * as uuid from "uuid";
import { AppState } from "../store/types";
import { NavLink } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import Button from "./buttons/button";
import auth from "../actions/auth";
import ModuleContainerBackground from "./modules/moduleContainerBackground";
import ModuleBigPopUp from "./modules/moduleBigPopUp";
import ModuleSmallPopUp from "./modules/moduleSmallPopUp";
import SignUpForm from "./forms/signup";
import LoginForm from "./forms/login";
import ForgotPassword from "./forms/forgotPassword";

interface IHeaderState {
    aboutLinkAffect: [boolean, boolean, boolean];
    eventsLinkAffect: [boolean, boolean, boolean];
    peopleLinkAffect: [boolean, boolean, boolean];
    projectsLinkAffect: [boolean, boolean, boolean];
    loginOrSignUpOrForgotPasswordForm: string;
    toggleNavDropDownMenu: string;
    toggleDisplayBigPopUpModule: boolean;
    toggleDisplaySmallPopUpModule: boolean;
    isUserLoggedIn: boolean;
}

interface IHeaderProps {
    isUserLoggedIn: boolean;
    logOut: () => void;
}

class Header extends React.Component<IHeaderProps, IHeaderState> {
    private unActiveLinkClass: string = "is-active-nav-link--hover";
    private activeLinkClasses: string =
        "is-active-nav-link is-active-nav-link--hover";
    private acitveDarkLinkClasses: string =
        "is-active-nav-link--dark is-active-nav-link--hover";
    private dropDownMenuHiddenClass: string =
        "is-unexpanded-header-drop-down-menu";
    private dropDownMenuShownClass: string =
        "is-expanded-header-drop-down-menu";

    public state: IHeaderState = {
        aboutLinkAffect: [true, false, false],
        eventsLinkAffect: [true, false, false],
        peopleLinkAffect: [true, false, false],
        projectsLinkAffect: [true, false, false],
        loginOrSignUpOrForgotPasswordForm: "login",
        toggleNavDropDownMenu: this.dropDownMenuHiddenClass,
        toggleDisplayBigPopUpModule: false,
        toggleDisplaySmallPopUpModule: false,
        isUserLoggedIn: this.props.isUserLoggedIn
    };

    constructor(props: IHeaderProps) {
        super(props);
        this.toggleDisplaySmallPopUpModule = this.toggleDisplaySmallPopUpModule.bind(
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
                toggleNavDropDownMenu:
                    prevState.toggleNavDropDownMenu ===
                    this.dropDownMenuHiddenClass
                        ? this.dropDownMenuShownClass
                        : this.dropDownMenuHiddenClass
            };
        });
    };
    public toggleDisplaySmallPopUpModule = (): void => {
        this.setState(prevState => {
            return {
                toggleDisplaySmallPopUpModule: prevState.toggleDisplaySmallPopUpModule
                    ? false
                    : true
            };
        });
    };
    public toggleDisplayBigPopUpModule = (buttonClicked: string): void => {
        this.setState(prevState => {
            return {
                toggleDisplayBigPopUpModule: prevState.toggleDisplayBigPopUpModule
                    ? false
                    : true,
                loginOrSignUpOrForgotPasswordForm: buttonClicked
            };
        });
    };
    public closeDisplayPopUpModule = (): void => {
        this.setState(() => {
            return {
                toggleDisplayBigPopUpModule: false
            };
        });
    };
    public renderNavList = (): JSX.Element[] => {
        type NavListType = {
            url: string;
            name: string;
            class: () => string;
        }[];
        const navList: NavListType = [
            {
                url: "/events",
                name: "Events",
                class: () => {
                    if (this.state.eventsLinkAffect[0]) {
                        return this.unActiveLinkClass;
                    } else if (this.state.eventsLinkAffect[1]) {
                        return this.activeLinkClasses;
                    } else {
                        return this.acitveDarkLinkClasses;
                    }
                }
            },
            {
                url: "/projects",
                name: "Projects",
                class: () => {
                    if (this.state.projectsLinkAffect[0]) {
                        return this.unActiveLinkClass;
                    } else if (this.state.projectsLinkAffect[1]) {
                        return this.activeLinkClasses;
                    } else {
                        return this.acitveDarkLinkClasses;
                    }
                }
            },
            {
                url: "/people",
                name: "People",
                class: () => {
                    if (this.state.peopleLinkAffect[0]) {
                        return this.unActiveLinkClass;
                    } else if (this.state.peopleLinkAffect[1]) {
                        return this.activeLinkClasses;
                    } else {
                        return this.acitveDarkLinkClasses;
                    }
                }
            },
            {
                url: "/about",
                name: "About",
                class: () => {
                    if (this.state.aboutLinkAffect[0]) {
                        return this.unActiveLinkClass;
                    } else if (this.state.aboutLinkAffect[1]) {
                        return this.activeLinkClasses;
                    } else {
                        return this.acitveDarkLinkClasses;
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
                        onClick={this.toggleDisplaySmallPopUpModule}
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
                        this.toggleDisplayBigPopUpModule("login");
                    }}
                    text={"LOG IN"}
                    type={"button"}
                    classes={"btn-primary btn-sm"}
                />
                <Button
                    clickEvent={() => {
                        this.toggleDisplayBigPopUpModule("signup");
                    }}
                    text={"SIGN UP"}
                    type={"button"}
                    classes={"btn-primary btn-sm"}
                />
            </div>
        );
    };

    public logOut = (): void => {
        this.toggleDisplaySmallPopUpModule();
        this.props.logOut();
    };

    public chooseFormToShow = (): JSX.Element => {
        if (this.state.loginOrSignUpOrForgotPasswordForm === "signup") {
            return (
                <SignUpForm
                    closeDisplayPopUpModule={() => {
                        this.closeDisplayPopUpModule();
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
                        this.closeDisplayPopUpModule();
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
                        this.closeDisplayPopUpModule();
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
                <ModuleContainerBackground
                    toggleDisplayPopUpModule={
                        this.state.toggleDisplayBigPopUpModule
                    }
                >
                    <ModuleBigPopUp
                        clickEvent={() => {
                            this.toggleDisplayBigPopUpModule("login");
                        }}
                    >
                        {this.chooseFormToShow()}
                    </ModuleBigPopUp>
                </ModuleContainerBackground>
                <ModuleContainerBackground
                    toggleDisplayPopUpModule={
                        this.state.toggleDisplaySmallPopUpModule
                    }
                >
                    <ModuleSmallPopUp
                        toggleDisplaySmallPopUpModule={() => {
                            this.toggleDisplaySmallPopUpModule();
                        }}
                        clickEvent={() => {
                            this.logOut();
                        }}
                    />
                </ModuleContainerBackground>
                <header
                    id="header"
                    className={this.state.toggleNavDropDownMenu}
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

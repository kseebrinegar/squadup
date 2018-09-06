import * as React from "react";
import * as uuid from "uuid";
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

interface IHeaderState {
    aboutLinkAffect: string;
    eventsLinkAffect: string;
    peopleLinkAffect: string;
    projectsLinkAffect: string;
    loginOrSignUpForm: string;
    toggleNavDropDownMenu: string;
    toggleDisplayBigPopUpModule: boolean;
    toggleDisplaySmallPopUpModule: boolean;
    isUserLoggedIn: boolean;
}
export interface IHeaderProps {
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
        aboutLinkAffect: this.unActiveLinkClass,
        eventsLinkAffect: this.unActiveLinkClass,
        peopleLinkAffect: this.unActiveLinkClass,
        projectsLinkAffect: this.unActiveLinkClass,
        loginOrSignUpForm: "login",
        toggleNavDropDownMenu: this.dropDownMenuHiddenClass,
        toggleDisplayBigPopUpModule: false,
        toggleDisplaySmallPopUpModule: false,
        isUserLoggedIn: this.props.isUserLoggedIn
    };

    constructor(props: IHeaderProps) {
        super(props);

        this.activeNavLinkForPage = this.activeNavLinkForPage.bind(this);
        this.darkenActiveNavLinkForPage = this.darkenActiveNavLinkForPage.bind(
            this
        );
        this.removeActiveLink = this.removeActiveLink.bind(this);
        this.renderNavList = this.renderNavList.bind(this);
        this.toggleNavDropDownMenu = this.toggleNavDropDownMenu.bind(this);
        this.toggleDisplayBigPopUpModule = this.toggleDisplayBigPopUpModule.bind(
            this
        );
        this.toggleDisplaySmallPopUpModule = this.toggleDisplaySmallPopUpModule.bind(
            this
        );
        this.renderButtonsOrIconsIfLoggedIn = this.renderButtonsOrIconsIfLoggedIn.bind(
            this
        );
        this.closeDisplayPopUpModule = this.closeDisplayPopUpModule.bind(this);
        this.manuallyChooseLoginOrSignUpForm = this.manuallyChooseLoginOrSignUpForm.bind(
            this
        );
        this.logOut = this.logOut.bind(this);
    }

    public darkenActiveNavLinkForPage(): void {
        const urlPath: string = window.location.pathname;
        this.setState(() => {
            return {
                aboutLinkAffect:
                    urlPath === "/about"
                        ? this.acitveDarkLinkClasses
                        : this.unActiveLinkClass,
                eventsLinkAffect:
                    urlPath === "/events"
                        ? this.acitveDarkLinkClasses
                        : this.unActiveLinkClass,
                peopleLinkAffect:
                    urlPath === "/people"
                        ? this.acitveDarkLinkClasses
                        : this.unActiveLinkClass,
                projectsLinkAffect:
                    urlPath === "/projects"
                        ? this.acitveDarkLinkClasses
                        : this.unActiveLinkClass
            };
        });
    }

    public manuallyChooseLoginOrSignUpForm(whatFormToClose: string) {
        this.setState(() => {
            return {
                loginOrSignUpForm: whatFormToClose
            };
        });
    }

    public activeNavLinkForPage(): void {
        const urlPath: string = window.location.pathname;
        this.setState(() => {
            return {
                aboutLinkAffect:
                    urlPath === "/about"
                        ? this.activeLinkClasses
                        : this.unActiveLinkClass,
                eventsLinkAffect:
                    urlPath === "/events"
                        ? this.activeLinkClasses
                        : this.unActiveLinkClass,
                peopleLinkAffect:
                    urlPath === "/people"
                        ? this.activeLinkClasses
                        : this.unActiveLinkClass,
                projectsLinkAffect:
                    urlPath === "/projects"
                        ? this.activeLinkClasses
                        : this.unActiveLinkClass
            };
        });
    }
    public removeActiveLink() {
        this.setState(() => {
            return {
                aboutLinkAffect: this.unActiveLinkClass,
                eventsLinkAffect: this.unActiveLinkClass,
                peopleLinkAffect: this.unActiveLinkClass,
                projectsLinkAffect: this.unActiveLinkClass
            };
        });
    }
    public toggleNavDropDownMenu() {
        this.setState(prevState => {
            return {
                toggleNavDropDownMenu:
                    prevState.toggleNavDropDownMenu ===
                    this.dropDownMenuHiddenClass
                        ? this.dropDownMenuShownClass
                        : this.dropDownMenuHiddenClass
            };
        });
    }
    public toggleDisplaySmallPopUpModule() {
        this.setState(prevState => {
            return {
                toggleDisplaySmallPopUpModule: prevState.toggleDisplaySmallPopUpModule
                    ? false
                    : true
            };
        });
    }
    public toggleDisplayBigPopUpModule(buttonClicked: string) {
        this.setState(prevState => {
            return {
                toggleDisplayBigPopUpModule: prevState.toggleDisplayBigPopUpModule
                    ? false
                    : true,
                loginOrSignUpForm:
                    buttonClicked === "login" ? "signup" : "login"
            };
        });
    }
    public closeDisplayPopUpModule() {
        this.setState(() => {
            return {
                toggleDisplayBigPopUpModule: false
            };
        });
    }
    public renderNavList(): any {
        const navList = [
            {
                url: "/events",
                name: "Events",
                state: this.state.eventsLinkAffect
            },
            {
                url: "/projects",
                name: "Projects",
                state: this.state.projectsLinkAffect
            },
            {
                url: "/people",
                name: "People",
                state: this.state.peopleLinkAffect
            },
            {
                url: "/about",
                name: "About",
                state: this.state.aboutLinkAffect
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
                    <div className={item.state} />
                </li>
            );
        });
    }
    public renderButtonsOrIconsIfLoggedIn() {
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
                        this.toggleDisplayBigPopUpModule("signin");
                    }}
                    text={"SIGN UP"}
                    type={"button"}
                    classes={"btn-primary btn-sm"}
                />
            </div>
        );
    }

    public logOut() {
        this.toggleDisplaySmallPopUpModule();
        this.props.logOut();
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.state.isUserLoggedIn != nextProps.isUserLoggedIn) {
            this.setState({
                isUserLoggedIn: nextProps.isUserLoggedIn
            });
        }
    }

    public componentDidMount() {
        this.activeNavLinkForPage();
    }
    public render() {
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
                        {this.state.loginOrSignUpForm === "login" ? (
                            <SignUpForm
                                closeDisplayPopUpModule={() => {
                                    this.closeDisplayPopUpModule();
                                }}
                                manuallyChooseLoginOrSignUpForm={() => {
                                    this.manuallyChooseLoginOrSignUpForm(
                                        "signup"
                                    );
                                }}
                            />
                        ) : (
                            <LoginForm
                                closeDisplayPopUpModule={() => {
                                    this.closeDisplayPopUpModule();
                                }}
                                manuallyChooseLoginOrSignUpForm={() => {
                                    this.manuallyChooseLoginOrSignUpForm(
                                        "login"
                                    );
                                }}
                            />
                        )}
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

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            logOut: auth.logOut
        },
        dispatch
    );
};

const mapStateToProps = (state: any) => {
    return {
        isUserLoggedIn: state.auth
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

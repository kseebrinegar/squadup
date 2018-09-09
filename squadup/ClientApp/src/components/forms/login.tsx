import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../store/types";
import auth from "../../actions/auth";
import Button from "../buttons/button";
import Input from "./inputs/inputs";
import LoaderAnimation from "../loaderAnimations/loaderAnimation";
import Success from "./success/success";

interface IState {
    [propName: string]: boolean | [string, boolean];
}

interface IProps {
    closeDisplayPopUpModule: () => void;
    logIn: (username: string, password: string) => void;
    isUserLoggedIn: boolean;
    manuallyChooseLoginOrSignUpOrForgotPasswordForm: (
        whatFormChoose: string
    ) => void;
}

class loginForm extends React.Component<IProps, IState> {
    public state: IState = {
        inputOneValueAndIsValid: ["", false],
        inputTwoValueAndIsValid: ["", false],
        isLoaderShown: false,
        isFormShown: true,
        isLoginNotiShown: false,
        clearInputsOnChildComponent: false
    };

    constructor(props: IProps) {
        super(props);
    }

    public changeInputState = (
        propName: string,
        inputOneValueAndIsValid: [string, boolean]
    ): void => {
        this.setState(() => {
            return {
                [propName]: inputOneValueAndIsValid
            };
        });
    };

    public onSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        let isAllInputValuesTrue: boolean = true;

        for (let prop in this.state) {
            if (
                !this.state[prop][1] &&
                this.state[prop] !== this.state.isLoaderShown &&
                this.state[prop] !== this.state.isFormShown &&
                this.state[prop] !== this.state.isLoginNotiShown
            ) {
                isAllInputValuesTrue = false;
                break;
            }
        }

        if (isAllInputValuesTrue) {
            const {
                inputOneValueAndIsValid,
                inputTwoValueAndIsValid
            } = this.state;

            this.setState(() => {
                return { isLoaderShown: true };
            });

            this.props.logIn(
                inputOneValueAndIsValid[0],
                inputTwoValueAndIsValid[0]
            );
        }
    };

    public timerForLoader = (): void => {
        const timer1: number = window.setTimeout(() => {
            this.setState(() => {
                return {
                    inputOneValueAndIsValid: ["", false],
                    inputTwoValueAndIsValid: ["", false],
                    isLoaderShown: false,
                    isFormShown: true,
                    isLoginNotiShown: false,
                    clearInputsOnChildComponent: false
                };
            });
            this.props.closeDisplayPopUpModule();
            clearInterval(timer1);
        }, 1500);
    };

    public componentWillReceiveProps(nextProps: {
        closeDisplayPopUpModule: Function;
        manuallyChooseLoginOrSignUpOrForgotPasswordForm: Function;
        isUserLoggedIn: boolean;
        logIn: Function;
    }) {
        if (
            this.props.isUserLoggedIn != nextProps.isUserLoggedIn &&
            nextProps.isUserLoggedIn
        ) {
            this.timerForLoader();
            this.setState(() => {
                return {
                    isLoginNotiShown: true,
                    clearInputsOnChildComponent: true,
                    isLoaderShown: false,
                    isFormShown: false
                };
            });
        }
    }

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <section className="signup-and-login-and-forgotpassword login">
                    <Success
                        isLoginNotiShown={this.state.isLoginNotiShown}
                        message={"You're now logged in."}
                    />
                    <form
                        className={`form ${
                            this.state.isFormShown ? "" : "is-hidden"
                        }`}
                    >
                        <h3>LOG IN</h3>
                        <LoaderAnimation
                            displayLoader={this.state.isLoaderShown}
                        />
                        <Input
                            returnInputValueAndValidation={(
                                inputOneValueAndIsValid: [string, boolean]
                            ) => {
                                this.changeInputState(
                                    "inputOneValueAndIsValid",
                                    inputOneValueAndIsValid
                                );
                            }}
                            clearInputsOnChildComponent={
                                this.state.clearInputsOnChildComponent
                            }
                            inputValueAndIsValid={
                                this.state.inputOneValueAndIsValid
                            }
                            inputType={"username"}
                            labelText={"USERNAME"}
                            maxLength={20}
                            type={"text"}
                        />
                        <Input
                            returnInputValueAndValidation={(
                                inputOneValueAndIsValid: [string, boolean]
                            ) => {
                                this.changeInputState(
                                    "inputTwoValueAndIsValid",
                                    inputOneValueAndIsValid
                                );
                            }}
                            clearInputsOnChildComponent={
                                this.state.clearInputsOnChildComponent
                            }
                            inputValueAndIsValid={
                                this.state.inputOneValueAndIsValid
                            }
                            inputType={"password"}
                            labelText={"PASSWORD"}
                            maxLength={20}
                            type={"password"}
                        />
                        <div className="signup-and-login-and-forgotpassword-call-to-actions">
                            <Button
                                clickEvent={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                ): void => {
                                    this.onSubmit(e);
                                }}
                                type={"button"}
                                text={"SIGN IN"}
                                classes={"btn-primary btn-md"}
                            />
                            <p>
                                Are you new to SquadUp?{" "}
                                <span
                                    onClick={() => {
                                        this.props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                                            "signup"
                                        );
                                    }}
                                >
                                    Sign up
                                </span>{" "}
                            </p>
                            <p className="forgot-password">
                                <span
                                    onClick={() => {
                                        this.props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                                            "forgotpassword"
                                        );
                                    }}
                                >
                                    FORGOT PASSWORD?
                                </span>
                            </p>
                        </div>
                    </form>
                </section>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            logIn: auth.logIn
        },
        dispatch
    );
};

const mapStateToProps = (state: AppState) => {
    return { isUserLoggedIn: state.auth };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(loginForm);

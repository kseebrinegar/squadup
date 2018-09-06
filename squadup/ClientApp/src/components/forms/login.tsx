import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import auth from "../../actions/auth";
import Button from "../buttons/button";
import Input from "./inputs/inputs";
import LoaderAnimation from "../loaderAnimations/loaderAnimation";
import Success from "./success/success";

interface IState {
    inputOneValueAndIsValid: [string, boolean];
    inputTwoValueAndIsValid: [string, boolean];
    isLoaderShown: boolean;
    isFormShown: boolean;
    isLoginNotiShown: boolean;
    clearInputsOnChildComponent: boolean;
}

interface IProps {
    closeDisplayPopUpModule: () => void;
    logIn: (username: string, password: string) => void;
    isUserLoggedIn: boolean;
    manuallyChooseLoginOrSignUpForm: () => void;
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
        this.changeInputState = this.changeInputState.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.timerForLoader = this.timerForLoader.bind(this);
    }

    public changeInputState(
        propName: string,
        inputOneValueAndIsValid: [string, boolean]
    ) {
        // @ts-ignore
        this.setState(() => {
            return {
                [propName]: inputOneValueAndIsValid
            };
        });
    }

    public onSubmit(e: any) {
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
    }

    public timerForLoader = () => {
        const timer1 = setTimeout(() => {
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

    public componentWillReceiveProps(nextProps: any) {
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

    public render() {
        return (
            <React.Fragment>
                <section className="signup-and-login login">
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
                        <div className="signup-and-login-call-to-actions">
                            <Button
                                clickEvent={(e: any) => {
                                    this.onSubmit(e);
                                }}
                                text={"SIGN IN"}
                                classes={"btn-primary btn-md"}
                            />
                            <p>
                                Are you new to SquadUp?{" "}
                                <span
                                    onClick={
                                        this.props
                                            .manuallyChooseLoginOrSignUpForm
                                    }
                                >
                                    Sign up
                                </span>{" "}
                            </p>
                            <p className="forgot-password">FORGOT PASSWORD?</p>
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

const mapStateToProps = (state: any) => {
    return { isUserLoggedIn: state.auth };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(loginForm);

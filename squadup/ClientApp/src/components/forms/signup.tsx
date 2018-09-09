import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../store/types";
import auth from "../../actions/auth";
import Button from "../buttons/button";
import Input from "./inputs/inputs";
import Success from "./success/success";
import LoaderAnimation from "../loaderAnimations/loaderAnimation";

interface IState {
    [propName: string]: boolean | [string, boolean];
}

interface IProps {
    closeDisplayPopUpModule: () => void;
    signUp: (username: string, password: string, email: string) => void;
    isUserLoggedIn: boolean;
    manuallyChooseLoginOrSignUpOrForgotPasswordForm: (
        whatFormChoosen: string
    ) => void;
}

class SignUpForm extends React.Component<IProps, IState> {
    public state: IState = {
        isLoaderShown: false,
        isFormShown: true,
        isLoginNotiShown: false,
        clearInputsOnChildComponent: false,
        inputOneValueAndIsValid: ["", false],
        inputTwoValueAndIsValid: ["", false],
        inputThreeValueAndIsValid: ["", false]
    };

    constructor(props: IProps) {
        super(props);
    }

    public changeInputState = (
        propName: string,
        inputValueAndIsValid: [string, boolean]
    ): void => {
        this.setState(() => {
            return {
                [propName]: inputValueAndIsValid
            };
        });
    };

    public onSubmit = (e: React.FormEvent<HTMLButtonElement>): void => {
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
                inputTwoValueAndIsValid,
                inputThreeValueAndIsValid
            } = this.state;

            this.setState(() => {
                return { isLoaderShown: true };
            });

            this.props.signUp(
                inputOneValueAndIsValid[0],
                inputTwoValueAndIsValid[0],
                inputThreeValueAndIsValid[0]
            );
        }
    };

    public timerForLoader = (): void => {
        const timer1: number = window.setTimeout(() => {
            this.setState(() => {
                return {
                    inputOneValueAndIsValid: ["", false],
                    inputTwoValueAndIsValid: ["", false],
                    inputThreeValueAndIsValid: ["", false],
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
        signUp: Function;
    }): void {
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
            <section className="signup-and-login-and-forgotpassword signup">
                <Success
                    isLoginNotiShown={this.state.isLoginNotiShown}
                    message={"You created an account."}
                />
                <form
                    className={`form ${
                        this.state.isFormShown ? "" : "is-hidden"
                    }`}
                >
                    <h3>SIGN UP</h3>
                    <LoaderAnimation displayLoader={this.state.isLoaderShown} />
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
                        labelText={"CHOOSE A USERNAME"}
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
                        labelText={"MAKE A PASSWORD"}
                        maxLength={20}
                        type={"password"}
                    />
                    <Input
                        returnInputValueAndValidation={(
                            inputOneValueAndIsValid: [string, boolean]
                        ) => {
                            this.changeInputState(
                                "inputThreeValueAndIsValid",
                                inputOneValueAndIsValid
                            );
                        }}
                        clearInputsOnChildComponent={
                            this.state.clearInputsOnChildComponent
                        }
                        inputValueAndIsValid={
                            this.state.inputOneValueAndIsValid
                        }
                        inputType={"email"}
                        labelText={"ENTER YOUR EMAIL"}
                        maxLength={320}
                        type={"text"}
                    />
                    <div className="signup-and-login-and-forgotpassword-call-to-actions">
                        <Button
                            clickEvent={(
                                e: React.MouseEvent<HTMLButtonElement>
                            ) => {
                                this.onSubmit(e);
                            }}
                            text={"SIGN UP"}
                            type={"button"}
                            classes={"btn-primary btn-md"}
                        />
                        <p>
                            Already have an account?{" "}
                            <span
                                onClick={() => {
                                    this.props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                                        "login"
                                    );
                                }}
                            >
                                Login
                            </span>{" "}
                        </p>
                    </div>
                </form>
            </section>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            signUp: auth.signUp
        },
        dispatch
    );

const mapStateToProps = (state: AppState) => ({
    isUserLoggedIn: state.auth
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpForm);

import * as React from "react";
import axios from "axios";
import Button from "../buttons/button";
import Input from "./inputs/inputs";
import Success from "./success/success";
import LoaderAnimation from "../loaderAnimations/loaderAnimation";

interface IState {
    [propName: string]: boolean | [string, boolean];
}

interface IProps {
    closeDisplayPopUpModule: () => void;
    manuallyChooseLoginOrSignUpOrForgotPasswordForm: (
        whatFormChoosen: string
    ) => void;
}

class ForgotPasswordForm extends React.Component<IProps, IState> {
    public state: IState = {
        isLoaderShown: false,
        isFormShown: true,
        isLoginNotiShown: false,
        clearInputsOnChildComponent: false,
        inputOneValueAndIsValid: ["", false]
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
            const { inputOneValueAndIsValid } = this.state;

            this.setState(() => {
                return { isLoaderShown: true };
            });

            this.sendEmail(inputOneValueAndIsValid[0]);
        }
    };

    public sendEmail(emailValue: string) {
        // console.log(emailValue);
        const email: string = "sydney@fife";
        const password: string = "pistol";
        axios
            .post("https://reqres.in/api/register", {
                email,
                password
            })
            .then(
                (res: unknown) => {
                    // console.log(res.data);
                    this.timerForLoader();
                    this.setState(() => {
                        return {
                            isLoginNotiShown: true,
                            clearInputsOnChildComponent: true,
                            isLoaderShown: false,
                            isFormShown: false
                        };
                    });
                },
                e => {
                    // console.log(e);
                }
            );
    }

    public timerForLoader = (): void => {
        const timer1: number = window.setTimeout(() => {
            this.setState(() => {
                return {
                    inputOneValueAndIsValid: ["", false],
                    isLoaderShown: false,
                    isFormShown: true,
                    isLoginNotiShown: false,
                    clearInputsOnChildComponent: false
                };
            });

            clearInterval(timer1);
        }, 1500);
    };

    public render(): JSX.Element {
        return (
            <section className="signup-and-login-and-forgotpassword forgotpassword">
                <Success
                    isLoginNotiShown={this.state.isLoginNotiShown}
                    message={"Check Email for link."}
                />
                <form
                    className={`form ${
                        this.state.isFormShown ? "" : "is-hidden"
                    }`}
                >
                    <h3>Forgot Password</h3>
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
                            text={"EMAIL ME"}
                            type={"button"}
                            classes={"btn-primary btn-md"}
                        />
                        <p>
                            Ready to try again?{" "}
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

export default ForgotPasswordForm;

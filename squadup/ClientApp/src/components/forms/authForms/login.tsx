import * as React from "react";
import authFormContainer from "./authFormContainter";
import Button from "../../buttons/button";
import Input from "../inputs/inputs";
import modalAniAndSuccContainer from "../../modals/modalAniAndSuccContainer";
import { WrappedComponentProps as SFCloginProps } from "./authFormContainter";

export interface SFCloginProps {}

const login: React.SFC<SFCloginProps> = (props): JSX.Element => {
    return (
        <section className="signup-and-login-and-forgotpassword login">
            <form className="form">
                <h3>LOG IN</h3>

                <Input
                    serverErrorMessage={props.serverErrorMessage}
                    returnInputValueAndValidation={(
                        inputOneValueAndIsValid: [string, boolean]
                    ) => {
                        props.changeInputState(
                            "inputOneValueAndIsValid",
                            inputOneValueAndIsValid
                        );
                    }}
                    clearInputsOnChildComponent={
                        props.clearInputsOnChildComponent
                    }
                    inputValueAndIsValid={props.inputValueAndIsValid}
                    inputType={"username"}
                    labelText={"USERNAME"}
                    maxLength={20}
                    type={"text"}
                />
                <Input
                    returnInputValueAndValidation={(
                        inputOneValueAndIsValid: [string, boolean]
                    ) => {
                        props.changeInputState(
                            "inputTwoValueAndIsValid",
                            inputOneValueAndIsValid
                        );
                    }}
                    clearInputsOnChildComponent={
                        props.clearInputsOnChildComponent
                    }
                    inputValueAndIsValid={props.inputValueAndIsValid}
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
                            props.onSubmit(e, 4, "logIn");
                        }}
                        type={"button"}
                        text={"SIGN IN"}
                        classes={"btn-primary btn-md"}
                    />
                    <p>
                        Are you new to SquadUp?{" "}
                        <span
                            onClick={() => {
                                props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
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
                                props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
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
    );
};

export default modalAniAndSuccContainer(authFormContainer(login));

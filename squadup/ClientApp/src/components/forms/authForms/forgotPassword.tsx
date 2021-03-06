import * as React from "react";
import authFormContainer from "./authFormContainter";
import Button from "../../buttons/button";
import Input from "../inputs/inputs";
import modalAniAndSuccContainer from "../../modals/modalAniAndSuccContainer";

import { WrappedComponentProps as SFCForgotPasswordProps } from "./authFormContainter";

export interface SFCForgotPasswordProps {}

const forgotpassword: React.SFC<SFCForgotPasswordProps> = (
    props
): JSX.Element => {
    return (
        <section className="signup-and-login-and-forgotpassword forgotpassword">
            <form className="form">
                <h3>Forgot Password</h3>
                <Input
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
                    inputType={"email"}
                    labelText={"ENTER YOUR EMAIL"}
                    maxLength={320}
                    type={"text"}
                    serverErrorMessage={props.serverErrorMessage}
                />
                <div className="signup-and-login-and-forgotpassword-call-to-actions">
                    <Button
                        clickEvent={(
                            e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                            props.onSubmit(e, 3, "sendEmail");
                        }}
                        text={"EMAIL ME"}
                        type={"button"}
                        classes={"btn-primary btn-md"}
                    />
                    <p>
                        Ready to try again?{" "}
                        <span
                            onClick={() => {
                                props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
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
};

export default modalAniAndSuccContainer(authFormContainer(forgotpassword));

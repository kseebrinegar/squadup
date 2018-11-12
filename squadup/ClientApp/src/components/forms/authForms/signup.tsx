import * as React from "react";
import authFormContainer from "./authFormContainter";
import Button from "../../buttons/button";
import Input from "../inputs/inputs";
import modalAniAndSuccContainer from "../../modals/modalAniAndSuccContainer";
import { WrappedComponentProps as SFCSignUpProps } from "./authFormContainter";

export interface SFCSignUpProps {}

const signup: React.SFC<SFCSignUpProps> = (props): JSX.Element => {
    const { serverErrorMessage } = props;
    const errorMessages: string[] = [
        "Sorry, something went wrong. Please try again",
        "Username is already in use.",
        "Email is already in use."
    ];
    const serverErrorFor: { input1: string; input3: string } = {
        input1: "",
        input3: ""
    };

    const determineWhatInputGetsErrorMessage = () => {
        if (
            serverErrorMessage === errorMessages[0] ||
            serverErrorMessage === errorMessages[1]
        ) {
            serverErrorFor.input1 = serverErrorMessage;
        } else if (serverErrorMessage === errorMessages[2]) {
            serverErrorFor.input3 = serverErrorMessage;
        } else if (
            serverErrorMessage[0] === errorMessages[1] &&
            serverErrorMessage[1] === errorMessages[2]
        ) {
            serverErrorFor.input1 = serverErrorMessage[0];
            serverErrorFor.input3 = serverErrorMessage[1];
        }
    };

    if (serverErrorMessage) {
        determineWhatInputGetsErrorMessage();
    }

    return (
        <section className="signup-and-login-and-forgotpassword signup">
            <form className="form">
                <h3>SIGN UP</h3>
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
                    inputType={"username"}
                    labelText={"CHOOSE A USERNAME"}
                    maxLength={20}
                    type={"text"}
                    serverErrorMessage={serverErrorFor.input1}
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
                    labelText={"MAKE A PASSWORD"}
                    maxLength={20}
                    type={"password"}
                />
                <Input
                    returnInputValueAndValidation={(
                        inputOneValueAndIsValid: [string, boolean]
                    ) => {
                        props.changeInputState(
                            "inputThreeValueAndIsValid",
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
                    serverErrorMessage={serverErrorFor.input3}
                />
                <div className="signup-and-login-and-forgotpassword-call-to-actions">
                    <Button
                        clickEvent={(
                            e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                            props.onSubmit(e, 5, "signUp");
                        }}
                        text={"SIGN UP"}
                        type={"button"}
                        classes={"btn-primary btn-md"}
                    />
                    <p>
                        Already have an account?{" "}
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

export default modalAniAndSuccContainer(authFormContainer(signup));

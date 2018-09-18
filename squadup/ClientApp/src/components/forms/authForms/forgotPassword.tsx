import * as React from "react";
import authFormContainer from "./authFormContainter";
import Button from "../../buttons/button";
import Input from "../inputs/inputs";
import LoaderAnimation from "../../loaderAnimations/loaderAnimation";
import Success from "../success/success";

interface SFCForgotPasswordProps {
    clearInputsOnChildComponent: boolean;
    isFormShown: boolean;
    isLoaderShown: boolean;
    isLoginNotiShown: boolean;
    inputValueAndIsValid: [string, boolean];
    changeInputState: (
        propName: string,
        inputValueAndIsValid: [string, boolean]
    ) => void;
    manuallyChooseLoginOrSignUpOrForgotPasswordForm: (
        whatFromToClose: string
    ) => void;
    onSubmit: (
        e: React.MouseEvent<HTMLButtonElement>,
        attendedStateLength: number,
        functionNameForFormType: string
    ) => void;
}

const forgotpassword: React.SFC<SFCForgotPasswordProps> = (
    props
): JSX.Element => {
    return (
        <section className="signup-and-login-and-forgotpassword forgotpassword">
            <Success
                isLoginNotiShown={props.isLoginNotiShown}
                message={"Check Email for link."}
            />
            <form className={`form ${props.isFormShown ? "" : "is-hidden"}`}>
                <h3>Forgot Password</h3>
                <LoaderAnimation displayLoader={props.isLoaderShown} />
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
                />
                <div className="signup-and-login-and-forgotpassword-call-to-actions">
                    <Button
                        clickEvent={(
                            e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                            props.onSubmit(e, 5, "sendEmail");
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

export default authFormContainer(forgotpassword);

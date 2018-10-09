import * as React from "react";
import authFormContainer from "./authFormContainter";
import Button from "../../buttons/button";
import Input from "../inputs/inputs";
import LoaderAnimation from "../../loaderAnimations/loaderAnimation";
import Success from "../success/success";

interface SFCSignUpProps {
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

const signup: React.SFC<SFCSignUpProps> = (props): JSX.Element => {
    return (
        <section className="signup-and-login-and-forgotpassword signup">
            <Success
                isLoginNotiShown={props.isLoginNotiShown}
                message={"You created an account."}
            />
            <form className={`form ${props.isFormShown ? "" : "is-hidden"}`}>
                <h3>SIGN UP</h3>
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
                    inputType={"username"}
                    labelText={"CHOOSE A USERNAME"}
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
                />
                <div className="signup-and-login-and-forgotpassword-call-to-actions">
                    <Button
                        clickEvent={(
                            e: React.MouseEvent<HTMLButtonElement>
                        ) => {
                            props.onSubmit(e, 7, "signUp");
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

export default authFormContainer(signup);

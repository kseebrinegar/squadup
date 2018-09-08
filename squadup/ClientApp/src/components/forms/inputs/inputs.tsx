import * as React from "react";

interface IState {
    isInputValid: [boolean, boolean];
    inputErrorMessage: string;
    inputValue: string;
    toggleInputLabel: boolean;
    toggleInputBorderEffect: boolean;
}

interface IProps {
    returnInputValueAndValidation: any;
    clearInputsOnChildComponent: boolean | [string, boolean];
    inputValueAndIsValid: boolean | [string, boolean];
    inputType: string;
    labelText: string;
    maxLength: number;
    type: string;
}
class Input extends React.Component<IProps, IState> {
    private errorMessagesOnlyContain: string =
        "Must contain only letters and numbers.";
    private errorMessageLength: string = "Must be between 3 and 20 characters.";
    private errorMessageEmail: string = "Must be a valid email.";

    public state: IState = {
        isInputValid: [false, false],
        inputErrorMessage: "",
        inputValue: "",
        toggleInputLabel: false,
        toggleInputBorderEffect: false
    };

    constructor(props: IProps) {
        super(props);
    }

    public displayErrors = (
        displayErrorsIfInValid: [boolean, boolean],
        errorMessage: string
    ): void => {
        this.setState(() => {
            return {
                inputErrorMessage: errorMessage,
                isInputValid: displayErrorsIfInValid
            };
        });
    };

    public validateEmail = (e: React.FormEvent<HTMLInputElement>): void => {
        const inputLength = e.currentTarget.value.length;
        const isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            e.currentTarget.value
        );

        if (inputLength === 0) {
            this.displayErrors([false, false], "");
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);

            return;
        }

        if (inputLength < 3 || !isValid) {
            this.displayErrors([true, false], this.errorMessageEmail);
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);

            return;
        }

        this.displayErrors([false, true], "");
        this.props.returnInputValueAndValidation([this.state.inputValue, true]);
    };

    public validatePassword = (e: React.FormEvent<HTMLInputElement>): void => {
        const inputLength = e.currentTarget.value.length;

        if (inputLength === 0) {
            this.displayErrors([false, false], "");
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);
            return;
        }

        if (inputLength < 3 || inputLength > 20) {
            this.displayErrors([true, false], this.errorMessageLength);
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);

            return;
        }

        this.displayErrors([false, true], "");
        this.props.returnInputValueAndValidation([this.state.inputValue, true]);
    };

    public validateUserName = (e: React.FormEvent<HTMLInputElement>): void => {
        const inputLength = e.currentTarget.value.length;
        const isValid = /^[0-9a-zA-Z]+$/.test(e.currentTarget.value);

        if (inputLength === 0) {
            this.displayErrors([false, false], "");
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);

            return;
        }

        if (inputLength < 3 || inputLength > 20) {
            this.displayErrors([true, false], this.errorMessageLength);
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);

            return;
        } else if (!isValid) {
            this.displayErrors([true, false], this.errorMessagesOnlyContain);
            this.props.returnInputValueAndValidation([
                this.state.inputValue,
                false
            ]);

            return;
        }

        this.displayErrors([false, true], "");
        this.props.returnInputValueAndValidation([this.state.inputValue, true]);
    };

    public toggleInputLabel = (e: React.FormEvent<HTMLInputElement>): void => {
        const inputLength = e.currentTarget.value.length;
        const inputVal = e.currentTarget.value;

        this.setState(() => {
            return {
                toggleInputLabel: inputLength > 0 ? true : false,
                toggleInputBorderEffect: inputLength > 0 ? true : false,
                inputValue: inputVal.trim().toLowerCase(),
                inputErrorMessage: "",
                isInputValid: [false, false]
            };
        });
    };

    public chooseValidationType = (
        e: React.FormEvent<HTMLInputElement>
    ): void => {
        e.preventDefault();
        const { inputType } = this.props;

        switch (inputType) {
            case "username":
                this.validateUserName(e);
                break;
            case "password":
                this.validatePassword(e);
                break;
            case "email":
                this.validateEmail(e);
                break;
            default:
                return;
        }
    };

    public componentWillReceiveProps(nextProps: {
        returnInputValueAndValidation: (
            inputOneValueAndIsValid: [string, boolean]
        ) => void;
        clearInputsOnChildComponent: boolean;
        inputValueAndIsValid: [string, boolean];
        inputType: string;
        labelText: string;
        maxLength: number;
        type: string;
    }): void {
        if (nextProps.clearInputsOnChildComponent === true) {
            this.setState(() => {
                return {
                    isInputValid: [false, false],
                    inputErrorMessage: "",
                    inputValue: "",
                    toggleInputLabel: false,
                    toggleInputBorderEffect: false
                };
            });
        }
    }

    public render() {
        return (
            <div className="input-container">
                <input
                    className="input"
                    onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        this.toggleInputLabel(e);
                    }}
                    onBlur={(e: React.FormEvent<HTMLInputElement>) => {
                        this.chooseValidationType(e);
                    }}
                    value={this.state.inputValue}
                    maxLength={this.props.maxLength}
                    type={this.props.type}
                />
                <p
                    className={
                        this.state.toggleInputLabel
                            ? "label-active-text"
                            : "label"
                    }
                >
                    {this.props.labelText}
                </p>
                <div
                    className={
                        this.state.toggleInputBorderEffect
                            ? "input-border-effect-active"
                            : "input-border-effect"
                    }
                />
                <div
                    className={
                        this.state.isInputValid[0]
                            ? "icon-container is-shown"
                            : "icon-container is-hidden"
                    }
                >
                    <i className="fas fa-fw fa-exclamation icon-red-md icon-exclamation" />
                </div>
                <div
                    className={
                        this.state.isInputValid[1]
                            ? "icon-container is-shown"
                            : "icon-container is-hidden"
                    }
                >
                    <i className="fas fa-fw fa-check icon-green-md icon-check" />
                </div>
                <p className="error-message">{this.state.inputErrorMessage}</p>
            </div>
        );
    }
}

export default Input;

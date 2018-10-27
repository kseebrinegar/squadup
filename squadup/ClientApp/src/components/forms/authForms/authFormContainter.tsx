import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../store/types";
import axios from "axios";
import auth from "../../../actions/auth";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface IState {
    [propName: string]: boolean | [string, boolean] | string | [string, string];
}

interface IProps extends RouteComponentProps<{}> {
    closeDisplayPopUpModule: () => void;
    logIn: () => void;
    signUp: () => void;
    isUserLoggedIn: boolean;
    manuallyChooseLoginOrSignUpOrForgotPasswordForm: (
        whatFormChoose: string
    ) => void;
}

// @ts-ignore
const authFormContainer = WrappedContainer => {
    class AuthFormContainer extends React.Component<IProps, IState> {
        private originalStateLength = 5;

        public state: IState = {
            isLoaderShown: false,
            isFormShown: true,
            isNotifyShown: false,
            clearInputsOnChildComponent: false,
            serverErrorMessage: ""
        };

        constructor(props: IProps) {
            super(props);
        }

        public resetServerErrorMessage = (): void => {
            this.setState(() => {
                return { serverErrorMessage: "" };
            });
        };

        public serverErrorMessage = (
            serverErrorMessage: string | [string, string]
        ): void => {
            this.setState(() => {
                return { isLoaderShown: false, serverErrorMessage };
            });
        };

        public changeInputState = (
            propName: string,
            inputValueAndIsValid: [string, boolean]
        ): void => {
            this.setState(() => {
                return {
                    [propName]: inputValueAndIsValid,
                    serverErrorMessage: ""
                };
            });
        };

        public onSubmit = (
            e: React.FormEvent<HTMLButtonElement>,
            attendedStateLength: number,
            functionNameForFormType: string
        ): void => {
            this.resetServerErrorMessage();
            e.preventDefault();
            const currentStateLength = Object.keys(this.state).length;
            const isAllInputValuesTrue = this.checkInputValuesForTrue(
                attendedStateLength,
                currentStateLength
            );

            if (isAllInputValuesTrue) {
                // const inputValues = this.getInputValues(currentStateLength);

                this.setState(() => {
                    return { isLoaderShown: true };
                });

                this.chooseRouteBasedOffOfFormType(functionNameForFormType);
            }
        };

        public checkInputValuesForTrue = (
            attendedStateLength: number,
            currentStateLength: number
        ): boolean => {
            for (let prop in this.state) {
                if (
                    currentStateLength !== attendedStateLength ||
                    this.state[prop][1] === false
                ) {
                    return false;
                }
            }

            return true;
        };

        public getInputValues = (currentStateLength: number): string[] => {
            let inputValues: string[] = [];

            for (
                let i = this.originalStateLength;
                i < currentStateLength;
                i++
            ) {
                let index = this.state[Object.keys(this.state)[i]];
                inputValues.push(index[0]);
            }

            return inputValues;
        };

        public chooseRouteBasedOffOfFormType(
            functionNameForFormType: string
        ): void {
            switch (functionNameForFormType) {
                case "logIn":
                    this.logIn();
                    break;
                // this.logIn(inputValues)
                case "signUp":
                    this.signUp();
                    break;
                // this.signUp(inputValues)
                case "sendEmail":
                    this.sendEmail();
                    // this.sendEmail(inputValues)
                    break;
                default:
                    return;
            }
        }

        public logIn = (): void => {
            axios
                .post("https://reqres.in/api/login", {
                    email: "peter@klaven",
                    password: "asdasd"
                })
                .then(
                    () => {
                        this.props.logIn();
                    },
                    e => {
                        this.serverErrorMessage(e.response.data.error);
                    }
                );
        };

        public signUp = (): void => {
            axios
                .post("https://reqres.in/api/login", {
                    email: "peter@klaven"
                })
                .then(
                    () => {
                        this.props.signUp();
                    },
                    e => {
                        this.serverErrorMessage(e.response.data.error);
                    }
                );
        };

        public sendEmail(): void {
            axios
                .post("https://reqres.in/api/login", {
                    email: "peter@klaven",
                    password: "asdasd"
                })
                .then(
                    () => {
                        this.setState(() => {
                            this.timerForLoader();
                            return {
                                isNotifyShown: true,
                                clearInputsOnChildComponent: true,
                                isLoaderShown: false,
                                isFormShown: false
                            };
                        });
                    },
                    e => {
                        this.serverErrorMessage(e.response.data.error);
                    }
                );
        }

        public timerForLoader = (): void => {
            const timer1: number = window.setTimeout(() => {
                const currentStateLength = Object.keys(this.state).length;

                for (
                    let i = this.originalStateLength;
                    i < currentStateLength;
                    i++
                ) {
                    const keyNames = Object.keys(this.state);

                    this.setState(() => {
                        return { [keyNames[i]]: ["", false] };
                    });
                }

                this.setState(() => {
                    return {
                        isLoaderShown: false,
                        isFormShown: true,
                        isNotifyShown: false,
                        clearInputsOnChildComponent: false,
                        serverErrorMessage: ""
                    };
                });

                this.props.closeDisplayPopUpModule();
                clearInterval(timer1);
                this.props.history.push("/dashboard");
            }, 1500);
        };

        public componentWillReceiveProps(nextProps: {
            closeDisplayPopUpModule: Function;
            manuallyChooseLoginOrSignUpOrForgotPasswordForm: Function;
            isUserLoggedIn: boolean;
            logIn: Function;
        }) {
            if (
                this.props.isUserLoggedIn !== nextProps.isUserLoggedIn &&
                nextProps.isUserLoggedIn
            ) {
                this.timerForLoader();
                this.setState(() => {
                    return {
                        isNotifyShown: true,
                        clearInputsOnChildComponent: true,
                        isLoaderShown: false,
                        isFormShown: false
                    };
                });
            }
        }

        public render(): JSX.Element {
            return (
                <WrappedContainer
                    {...this.state}
                    onSubmit={(
                        e: React.MouseEvent<HTMLButtonElement>,
                        attendedStateLength: number,
                        functionNameForFormType: string
                    ) => {
                        this.onSubmit(
                            e,
                            attendedStateLength,
                            functionNameForFormType
                        );
                    }}
                    changeInputState={(
                        propName: string,
                        inputValueAndIsValid: [string, boolean]
                    ) => {
                        this.changeInputState(propName, inputValueAndIsValid);
                    }}
                    manuallyChooseLoginOrSignUpOrForgotPasswordForm={(
                        whatFormToClose: string
                    ) => {
                        this.props.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                            whatFormToClose
                        );
                    }}
                />
            );
        }
    }

    const mapDispatchToProps = (dispatch: Dispatch) => {
        return bindActionCreators(
            { logIn: auth.logIn, signUp: auth.signUp },
            dispatch
        );
    };

    const mapStateToProps = (state: AppState) => {
        return { isUserLoggedIn: state.auth };
    };

    return withRouter(
        connect(
            mapStateToProps,
            mapDispatchToProps
        )(AuthFormContainer)
    );
};

export default authFormContainer;

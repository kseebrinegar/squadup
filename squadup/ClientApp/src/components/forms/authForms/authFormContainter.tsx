import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../store/types";

import axios from "axios";
import auth from "../../../actions/auth";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface OwnProps extends RouteComponentProps<{}> {
    dislayLoader: () => void;
    notifyUserOfSuccess: (arg: () => void) => void;
    isPopUpShown: string;
}

interface DispatchProps {
    logIn: () => void;
    signUp: () => void;
}

interface StateProps {
    isUserLoggedIn: boolean;
}

interface IState {
    [propName: string]: boolean | [string, boolean] | string | [string, string];
}

type Props = OwnProps & DispatchProps & StateProps;

// @ts-ignore
const authFormContainer = WrappedComponent => {
    class AuthFormContainer extends React.Component<Props, IState> {
        private originalStateLength = 5;

        public state: IState = {
            isLoaderShown: false,
            isFormShown: true,
            isNotifyShown: false,
            clearInputsOnChildComponent: false,
            serverErrorMessage: ""
        };

        constructor(props: Props) {
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
            const currentStateLength = Object.keys(this.state).length;
            const inputValues: string[] = this.getInputValues(
                currentStateLength
            );

            switch (functionNameForFormType) {
                case "logIn":
                    this.logIn(inputValues);
                    break;
                case "signUp":
                    this.signUp(inputValues);
                    break;
                case "sendEmail":
                    this.sendEmail();
                    break;
                default:
                    return;
            }
        }

        public logIn = (inputValues: string[]): void => {
            inputValues;
            axios.post("https://reqres.in/api/users?delay=5").then(
                () => {
                    this.props.logIn();
                },
                e => {
                    this.serverErrorMessage(e.response.data.error);
                }
            );
        };

        public signUp = (inputValues: string[]): void => {
            inputValues;
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

                // this.props.closeDisplayPopUpModule();
                clearInterval(timer1);
                this.props.history.push("/dashboard");
            }, 1500);
        };

        public componentWillReceiveProps(nextProps: {
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

        public manuallyChooseLoginOrSignUpOrForgotPasswordForm = (
            whatFormToClose: string
        ): void => {
            switch (whatFormToClose) {
                case "login":
            }
        };

        public render(): JSX.Element {
            return (
                <WrappedComponent
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
                        this.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
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

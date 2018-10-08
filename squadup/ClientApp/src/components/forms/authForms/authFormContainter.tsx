import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../store/types";
import axios from "axios";
import auth from "../../../actions/auth";

interface IState {
    [propName: string]: boolean | [string, boolean];
}

interface IProps {
    closeDisplayPopUpModule: () => void;
    // logIn: (username: string, password: string) => void;
    logIn: () => void;
    signUp: () => void;
    isUserLoggedIn: boolean;
    manuallyChooseLoginOrSignUpOrForgotPasswordForm: (
        whatFormChoose: string
    ) => void;
}
//@ts-ignore
const authFormContainer = (WrappedContainer: any) => {
    class AuthFormContainer extends React.Component<IProps, IState> {
        public state: IState = {
            isLoaderShown: false,
            isFormShown: true,
            isLoginNotiShown: false,
            clearInputsOnChildComponent: false
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

        public onSubmit = (
            e: React.FormEvent<HTMLButtonElement>,
            attendedStateLength: number,
            functionNameForFormType: string
        ): void => {
            e.preventDefault();
            let isAllInputValuesTrue: boolean = true;
            const currentStateLength = Object.keys(this.state).length;

            for (let prop in this.state) {
                if (
                    currentStateLength !== attendedStateLength ||
                    this.state[prop][1] === false
                ) {
                    isAllInputValuesTrue = false;
                    break;
                }
            }

            if (isAllInputValuesTrue) {
                let inputValues: string[] = [];
                const originalStateLength = 4;

                for (let i = originalStateLength; i < currentStateLength; i++) {
                    let index = this.state[Object.keys(this.state)[i]];
                    inputValues.push(index[0]);
                }

                this.setState(() => {
                    return { isLoaderShown: true };
                });

                switch (functionNameForFormType) {
                    case "logIn":
                        this.props.logIn();
                    // this.props.logIn(inputValues)
                    case "signUp":
                        this.props.signUp();
                    // this.props.signUp(inputValues)
                    case "sendEmail":
                        this.sendEmail();
                    // this.sendEmail(inputValues)
                    default:
                        return;
                }
            }
        };

        public sendEmail() {
            const email: string = "sydney@fife";
            const password: string = "pistol";
            axios
                .post("https://reqres.in/api/register", {
                    email,
                    password
                })
                .then(
                    () => {
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
                    () => {}
                );
        }

        public timerForLoader = (): void => {
            const timer1: number = window.setTimeout(() => {
                const currentStateLength = Object.keys(this.state).length;
                const originalStateLength = 4;

                for (let i = originalStateLength; i < currentStateLength; i++) {
                    const keyNames = Object.keys(this.state);

                    this.setState(() => {
                        return {
                            [keyNames[i]]: ["", false]
                        };
                    });
                }

                this.setState(() => {
                    return {
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
            logIn: Function;
        }) {
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

    return connect(
        mapStateToProps,
        mapDispatchToProps
    )(AuthFormContainer);
};

export default authFormContainer;

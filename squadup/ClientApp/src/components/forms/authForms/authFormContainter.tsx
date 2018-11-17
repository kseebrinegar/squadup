import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { AppState } from "../../../store/types";
import { ModalPopUps } from "../../../reducers/modalPopUps";

import axios from "axios";
import auth from "../../../actions/auth";
import { withRouter, RouteComponentProps } from "react-router-dom";
import modalPopUpsActions from "../../../actions/modalPopUp";
interface OwnProps extends RouteComponentProps<{}> {
    dislayLoader: () => void;
    notifyUserOfSuccess: (arg: () => void) => void;
    isPopUpShown: string;
    togglePopUp: string;
    toggleDisplayPopUpModal: () => void;
}

interface DispatchProps {
    logIn: (payload: number) => { type: string; payload: number };
    signUp: () => void;
    toggleLogInPopUp: (payload: boolean) => { type: string; payload: boolean };
    toggleSignUpPopUp: (payload: boolean) => { type: string; payload: boolean };
    toggleForgotPasswordPopUp: (
        payload: boolean
    ) => { type: string; payload: boolean };
}

interface StateProps {
    isUserLoggedIn: boolean;
    modalPopUpsState: ModalPopUps;
}

interface IState {
    [propName: string]: boolean | [string, boolean] | string | [string, string];
}

type Props = OwnProps & DispatchProps & StateProps;

export interface WrappedComponentProps {
    clearInputsOnChildComponent: boolean;
    inputValueAndIsValid: [string, boolean];
    serverErrorMessage: string;
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

const authFormContainer = <P extends WrappedComponentProps>(
    WrappedComponent: React.SFC<P>
) => {
    class AuthFormContainer extends React.Component<Props, IState> {
        private originalStateLength = 2;

        public state: IState = {
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
                return { serverErrorMessage };
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
                this.props.dislayLoader();
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
                    this.props.logIn(89);
                    this.props.notifyUserOfSuccess(() => {
                        this.props.history.push("/dashboard");
                    });
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
                        this.props.notifyUserOfSuccess(() => {
                            this.props.history.push("/dashboard");
                        });
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
                        this.props.notifyUserOfSuccess(() => {
                            this.props.toggleLogInPopUp(true);
                        });
                    },
                    e => {
                        this.serverErrorMessage(e.response.data.error);
                    }
                );
        }

        public manuallyChooseLoginOrSignUpOrForgotPasswordForm = (
            whatFormToOpen: string
        ): void => {
            switch (whatFormToOpen) {
                case "forgotpassword":
                    this.props.toggleForgotPasswordPopUp(true);
                    break;
                case "signup":
                    this.props.toggleSignUpPopUp(true);
                    break;
                case "login":
                    this.props.toggleLogInPopUp(true);
                    break;
                default:
                    return;
            }
        };

        public render(): React.ReactNode {
            return (
                <WrappedComponent
                    inputValueAndIsValid={["", false]}
                    clearInputsOnChildComponent={false}
                    serverErrorMessage={""}
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
                        whatFormToOPen: string
                    ) => {
                        this.manuallyChooseLoginOrSignUpOrForgotPasswordForm(
                            whatFormToOPen
                        );
                    }}
                />
            );
        }
    }

    const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
        return bindActionCreators(
            {
                logIn: auth.logIn,
                signUp: auth.signUp,
                toggleLogInPopUp: modalPopUpsActions.toggleLogInPopUp,
                toggleSignUpPopUp: modalPopUpsActions.toggleSignUpPopUp,
                toggleForgotPasswordPopUp:
                    modalPopUpsActions.toggleForgotPasswordPopUp
            },
            dispatch
        );
    };

    const mapStateToProps = (state: AppState): StateProps => {
        return {
            isUserLoggedIn: state.auth.isUserLoggedIn,
            modalPopUpsState: state.modalPopUps
        };
    };

    return withRouter(
        connect<StateProps, DispatchProps, {}, AppState>(
            mapStateToProps,
            mapDispatchToProps
        )(AuthFormContainer)
    );
};

export default authFormContainer;

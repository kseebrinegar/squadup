import * as React from "react";

import Button from "../buttons/button";
import ModalContainerBackground from "./modalContainerBackground";
import ToggleDisplayPopUpModal from "./toggleDisplayPopUpModal";
import LoaderAnimation from "../loaderAnimations/loaderAnimation";
import Success from "../forms/success/success";

interface SFCmoduleSmallPopUpProps {
    toggleDisplayPopUpModal: boolean;
    toggleDisplayPopUpModal1: () => void;
    clickEvent: (notifyUserOfSuccess: (logOut: () => void) => void) => void;
    closeDisplayPopUpModal: () => void;
    headerText: string;
    successText: string;
    notifyUserOfSuccess: (logOut: () => void) => void;
    isNotifyShown: boolean;
    isLoaderShown: boolean;
    dislayLoader: () => void;
}

const moduleSmallPopUp: React.SFC<SFCmoduleSmallPopUpProps> = (
    props
): JSX.Element => {
    const renderPopUpContent = () => {
        return (
            <React.Fragment>
                <ToggleDisplayPopUpModal
                    toggleDisplayPopUpModal={props.toggleDisplayPopUpModal1}
                />
                <h3>{props.headerText}</h3>
                <div className="modal-small-popup-yes-or-no">
                    <Button
                        clickEvent={() => {
                            props.dislayLoader();
                            props.clickEvent(props.notifyUserOfSuccess);
                        }}
                        text={"Yes"}
                        type={"button"}
                        classes={"btn-primary btn-md"}
                    />
                    <Button
                        clickEvent={props.toggleDisplayPopUpModal1}
                        text={"No"}
                        type={"button"}
                        classes={"btn-red btn-md"}
                    />
                </div>
            </React.Fragment>
        );
    };

    return (
        <ModalContainerBackground
            toggleDisplayPopUpModal={props.toggleDisplayPopUpModal}
        >
            <div className="modal-small-popup">
                <Success
                    isNotifyShown={props.isNotifyShown}
                    message={props.successText}
                />
                <LoaderAnimation displayLoader={props.isLoaderShown} />
                {props.isNotifyShown ? null : renderPopUpContent()}
            </div>
        </ModalContainerBackground>
    );
};

export default moduleSmallPopUp;

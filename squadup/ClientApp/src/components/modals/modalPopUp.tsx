import * as React from "react";

import ModalContainerBackground from "./modalContainerBackground";
import ToggleDisplayPopUpModal from "./toggleDisplayPopUpModal";
import LoaderAnimation from "../loaderAnimations/loaderAnimation";
import Success from "../success/success";

interface SFCModalPopUp {
    clickEvent: () => void;
    isDisplayPopUpModalShown: boolean;
    popUpClassName: string;
    isNotifyShown: boolean;
    successText: string;
    isLoaderShown: boolean;
}

const modalPopUp: React.SFC<SFCModalPopUp> = (props): JSX.Element | null => {
    const renderPopUpIfDisplayIsShown = () => {
        if (props.isDisplayPopUpModalShown) {
            return (
                <ModalContainerBackground
                    isDisplayPopUpModalShown={props.isDisplayPopUpModalShown}
                >
                    <div className={props.popUpClassName}>
                        <ToggleDisplayPopUpModal
                            toggleDisplayPopUpModal={props.clickEvent}
                        />
                        <Success
                            isNotifyShown={props.isNotifyShown}
                            message={props.successText}
                        />
                        <LoaderAnimation displayLoader={props.isLoaderShown} />
                        {props.children}
                    </div>
                </ModalContainerBackground>
            );
        }

        return null;
    };
    return renderPopUpIfDisplayIsShown();
};

export default modalPopUp;

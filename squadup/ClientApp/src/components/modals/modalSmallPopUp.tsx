import * as React from "react";

import Button from "../buttons/button";
import ModalAniAndSuccContainer from "./modalAniAndSuccContainer";

interface SFCmoduleSmallPopUpProps {
    toggleDisplayPopUpModal: () => void;
    clickEvent: (notifyUserOfSuccess: (logOut: () => void) => void) => void;
    headerText: string;
    notifyUserOfSuccess: (logOut: () => void) => void;
    isNotifyShown: boolean;
    dislayLoader: () => void;
}

const moduleSmallPopUp: React.SFC<SFCmoduleSmallPopUpProps> = (
    props
): JSX.Element => {
    const renderPopUpContent = () => {
        return (
            <React.Fragment>
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
                        clickEvent={props.toggleDisplayPopUpModal}
                        text={"No"}
                        type={"button"}
                        classes={"btn-red btn-md"}
                    />
                </div>
            </React.Fragment>
        );
    };

    return (
        <div className="modal-small-popup">
            {props.isNotifyShown ? null : renderPopUpContent()}
        </div>
    );
};

export default ModalAniAndSuccContainer(moduleSmallPopUp);

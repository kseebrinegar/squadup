import * as React from "react";

import Button from "../buttons/button";
import ToggleDisplayPopUpModal from "./toggleDisplayPopUpModal";

interface SFCmodalSmallPopUpProps {
    toggleDisplaySmallPopUpModal: () => void;
    clickEvent: () => void;
    headerText: string;
}

const moduleSmallPopUp: React.SFC<SFCmodalSmallPopUpProps> = (
    props
): JSX.Element => {
    return (
        <div className="modal-small-popup">
            <ToggleDisplayPopUpModal
                toggleDisplayPopUpModal={props.toggleDisplaySmallPopUpModal}
            />
            <h3>{props.headerText}</h3>
            <div className="modal-small-popup-yes-or-no">
                <Button
                    clickEvent={props.clickEvent}
                    text={"Yes"}
                    type={"button"}
                    classes={"btn-primary btn-md"}
                />
                <Button
                    clickEvent={props.toggleDisplaySmallPopUpModal}
                    text={"No"}
                    type={"button"}
                    classes={"btn-red btn-md"}
                />
            </div>
        </div>
    );
};

export default moduleSmallPopUp;

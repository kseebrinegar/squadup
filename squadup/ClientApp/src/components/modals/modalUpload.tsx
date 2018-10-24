import * as React from "react";

import ToggleDisplayPopUpModal from "./toggleDisplayPopUpModal";

interface SFCModalXLPopUp {
    clickEvent: () => void;
}
const modalXLPopUp: React.SFC<SFCModalXLPopUp> = (props): JSX.Element => {
    return (
        <div className="modal-upload-popup">
            <ToggleDisplayPopUpModal
                toggleDisplayPopUpModal={props.clickEvent}
            />
            {props.children}
        </div>
    );
};

export default modalXLPopUp;

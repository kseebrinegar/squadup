import * as React from "react";

import ToggleDisplayPopUpModal from "./toggleDisplayPopUpModal";
interface SFCmodalBigPopUpProps {
    clickEvent: () => void;
}
const modalBigPopUp: React.SFC<SFCmodalBigPopUpProps> = (
    props
): JSX.Element => {
    return (
        <div className="modal-big-popup">
            <ToggleDisplayPopUpModal
                toggleDisplayPopUpModal={props.clickEvent}
            />
            {props.children}
        </div>
    );
};

export default modalBigPopUp;

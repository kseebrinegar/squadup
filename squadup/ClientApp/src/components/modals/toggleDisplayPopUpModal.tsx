import * as React from "react";

interface SFCToggleDisplayPopUpModal {
    toggleDisplayPopUpModal: () => void;
}

const toggleDisplayPopUpModal: React.SFC<SFCToggleDisplayPopUpModal> = (
    props
): JSX.Element => {
    return (
        <div
            className="icon-container close-icon"
            onClick={props.toggleDisplayPopUpModal}
        >
            <div className="close-icon-line1" />
            <div className="close-icon-line2" />
        </div>
    );
};

export default toggleDisplayPopUpModal;

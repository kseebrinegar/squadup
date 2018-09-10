import * as React from "react";
interface SFCmodalBigPopUpProps {
    clickEvent: () => void;
}
const modalBigPopUp: React.SFC<SFCmodalBigPopUpProps> = (
    props
): JSX.Element => {
    return (
        <div className="module-big-popup">
            <div
                className="icon-container close-icon"
                onClick={props.clickEvent}
            >
                <div className="close-icon-line1" />
                <div className="close-icon-line2" />
            </div>
            {props.children}
        </div>
    );
};

export default modalBigPopUp;

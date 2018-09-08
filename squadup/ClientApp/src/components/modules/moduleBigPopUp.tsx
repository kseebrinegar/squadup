import * as React from "react";
interface SFCmoduleBigPopUpProps {
    clickEvent: () => void;
}
const moduleBigPopUp: React.SFC<SFCmoduleBigPopUpProps> = (
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

export default moduleBigPopUp;

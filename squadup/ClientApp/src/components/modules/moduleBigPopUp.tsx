import * as React from "react";

const moduleBigPopUp = (props: any) => {
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

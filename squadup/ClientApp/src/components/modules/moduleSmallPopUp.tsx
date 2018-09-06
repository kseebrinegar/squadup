import * as React from "react";
import Button from "../buttons/button";

const moduleSmallPopUp = (props: any) => {
    return (
        <div className="module-small-popup">
            <div
                className="icon-container close-icon"
                onClick={props.toggleDisplaySmallPopUpModule}
            >
                <div className="close-icon-line1" />
                <div className="close-icon-line2" />
            </div>
            <h3>Are you sure you wanna log out?</h3>
            <div className="module-small-popup-yes-or-no">
                <Button
                    clickEvent={props.clickEvent}
                    text={"Yes"}
                    type={"button"}
                    classes={"btn-primary btn-md"}
                />
                <Button
                    clickEvent={props.toggleDisplaySmallPopUpModule}
                    text={"No"}
                    type={"button"}
                    classes={"btn-red btn-md"}
                />
            </div>
        </div>
    );
};

export default moduleSmallPopUp;

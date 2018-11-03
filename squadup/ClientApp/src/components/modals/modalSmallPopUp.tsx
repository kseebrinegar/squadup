import * as React from "react";

import Button from "../buttons/button";

export interface SFCmodulePopUpProps {
    toggleDisplayPopUpModal: () => void;
    clickEvent: (notifyUserOfSuccess: (logOut: () => void) => void) => void;
    headerText: string;
    notifyUserOfSuccess: (logOut: () => void) => void;
    dislayLoader: () => void;
}

const modulePopUp: React.SFC<SFCmodulePopUpProps> = (props): JSX.Element => {
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

export default modulePopUp;

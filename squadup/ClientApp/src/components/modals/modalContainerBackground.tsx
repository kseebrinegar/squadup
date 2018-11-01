import * as React from "react";

interface SFCmodalContainerBackgroundProps {
    toggleDisplayPopUpModal: boolean;
    children: React.ReactNode;
}

const modalContainerBackground: React.SFC<SFCmodalContainerBackgroundProps> = (
    props
): JSX.Element => {
    return (
        <div
            className={
                props.toggleDisplayPopUpModal
                    ? `modal-background is-shown`
                    : `modal-background is-hidden`
            }
        >
            {props.children}
        </div>
    );
};

export default modalContainerBackground;

import * as React from "react";

interface SFCmodalContainerBackgroundProps {
    toggleDisplayPopUpModal: boolean;
}

const modalContainerBackground: React.SFC<SFCmodalContainerBackgroundProps> = (
    props
): JSX.Element => {
    return (
        <div
            className={
                props.toggleDisplayPopUpModal
                    ? `module-background is-shown`
                    : `module-background is-hidden`
            }
        >
            {props.children}
        </div>
    );
};

export default modalContainerBackground;

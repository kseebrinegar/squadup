import * as React from "react";

interface SFCmodalContainerBackgroundProps {
    isDisplayPopUpModalShown: boolean;
    children: React.ReactNode;
}

const modalContainerBackground: React.SFC<SFCmodalContainerBackgroundProps> = (
    props
): JSX.Element => {
    return (
        <div
            className={
                props.isDisplayPopUpModalShown
                    ? `modal-background is-shown`
                    : `modal-background is-hidden`
            }
        >
            {props.children}
        </div>
    );
};

export default modalContainerBackground;

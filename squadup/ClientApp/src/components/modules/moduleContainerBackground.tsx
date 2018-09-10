import * as React from "react";

interface SFCmoduleContainerBackgroundProps {
    toggleDisplayPopUpModule: boolean;
}

const moduleContainerBackground: React.SFC<
    SFCmoduleContainerBackgroundProps
> = (props): JSX.Element => {
    return (
        <div
            className={
                props.toggleDisplayPopUpModule
                    ? `module-background is-shown`
                    : `module-background is-hidden`
            }
        >
            {props.children}
        </div>
    );
};

export default moduleContainerBackground;

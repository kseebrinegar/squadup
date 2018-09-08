import * as React from "react";

const moduleContainerBackground = (props: any) => {
    console.log(props);
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

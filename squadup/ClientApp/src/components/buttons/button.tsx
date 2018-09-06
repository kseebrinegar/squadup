import * as React from "react";

const button = (props: any) => {
    return (
        <button
            onClick={props.clickEvent}
            type={props.type}
            className={props.classes}
        >
            {props.text}
        </button>
    );
};

export default button;

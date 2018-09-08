import * as React from "react";
type propType = {
    clickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
    type: string;
    classes: string;
};

const button = (props: propType): JSX.Element => {
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

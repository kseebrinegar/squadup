import * as React from "react";

interface SFCbuttonProps {
    clickEvent: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
    type: string;
    classes: string;
}

const button: React.SFC<SFCbuttonProps> = (props): JSX.Element => {
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

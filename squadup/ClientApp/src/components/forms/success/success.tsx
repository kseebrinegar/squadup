import * as React from "react";

interface SFCsuccessProps {
    isNotifyShown: boolean | [string, boolean];
    message: string;
}

const success: React.SFC<SFCsuccessProps> = (props): JSX.Element => {
    return (
        <div
            className={`success-noti-container ${
                props.isNotifyShown ? "" : "is-hidden"
            }`}
        >
            <h2 className="success-noti">Success!</h2>
            <p>{props.message}</p>
        </div>
    );
};

export default success;

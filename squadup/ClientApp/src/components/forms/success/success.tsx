import * as React from "react";
type propTypes = {
    isLoginNotiShown: boolean | [string, boolean];
    message: string;
};

const success = (props: propTypes): JSX.Element => {
    return (
        <div
            className={`success-noti-container ${
                props.isLoginNotiShown ? "" : "is-hidden"
            }`}
        >
            <h2 className="success-noti">Success!</h2>
            <p>{props.message}</p>
        </div>
    );
};

export default success;

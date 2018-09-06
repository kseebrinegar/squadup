import * as React from "react";

const success = (props: any) => {
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

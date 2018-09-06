import * as React from "react";
import * as uuid from "uuid";

const loaderAnimation = (props: { displayLoader: boolean }) => {
    const renderBar = () => {
        let barArr = [];

        for (let i = 1; i <= 12; i++) {
            barArr.push(<div key={uuid()} className={`bar${i}`} />);
        }

        return barArr;
    };

    return (
        <div
            className={
                props.displayLoader
                    ? `spinner-container`
                    : `spinner-container is-hidden`
            }
        >
            <div className="spinner">{renderBar()}</div>
        </div>
    );
};

export default loaderAnimation;

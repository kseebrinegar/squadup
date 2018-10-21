import * as React from "react";

interface SFCprojectAndUserImg {
    img: string;
    userName?: string | null;
    by?: string | null;
    projectName?: string | null;
}

const projectAndUserImg: React.SFC<SFCprojectAndUserImg> = (
    props
): JSX.Element => {
    const { img, projectName, userName, by } = props;
    return (
        <div className="users-and-projects-img-container">
            <div className="users-and-projects-img">
                <img src={img} />
                {props.children}
            </div>
            <p className="projectname">{projectName}</p>
            <p className="usersname">
                <span>{by}</span>
                {userName}
            </p>
        </div>
    );
};

projectAndUserImg.defaultProps = {
    userName: null,
    by: null,
    projectName: null
};

export default projectAndUserImg;

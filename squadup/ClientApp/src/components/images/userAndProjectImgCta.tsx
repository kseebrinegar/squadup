import * as React from "react";

interface SFCUsersAndProjectsImgCta {}

const usersAndProjectsImgCta: React.SFC<
    SFCUsersAndProjectsImgCta
> = (): JSX.Element => {
    return (
        <div className="users-and-projects-img-container-cta">
            <div className="users-and-projects-img-cta">
                <div className="upload-image-cta">
                    <p>Upload Image</p>
                </div>
            </div>
        </div>
    );
};

export default usersAndProjectsImgCta;

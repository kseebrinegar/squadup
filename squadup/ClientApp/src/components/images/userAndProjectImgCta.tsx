import * as React from "react";

interface ISFCusersAndProjectsImgCta {
    toggleDisplayPopUpModal: () => void;
}

const usersAndProjectsImgCta: React.SFC<ISFCusersAndProjectsImgCta> = (
    props
): JSX.Element => {
    return (
        <div
            onClick={props.toggleDisplayPopUpModal}
            className="users-and-projects-img-container-cta"
        >
            <div className="users-and-projects-img-cta-border">
                <div className="users-and-projects-img-cta">
                    <div className="upload-image-cta">
                        <p>Upload Image</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default usersAndProjectsImgCta;

import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import DropZone from "react-dropzone";
// @ts-ignore
// having trouble with setting up types with ImgCrop lib
import ImgCrop from "react-image-crop";
import { AppState } from "../../../store/types";
import axios from "axios";
import Button from "../../buttons/button";
import uploadImg from "../../../actions/uploadImg";
import Icon from "../../icons/icon";
import ModalAniAndSuccContainer from "../../modals/modalAniAndSuccContainer";

export interface OwnProps {
    dislayLoader: () => void;
    notifyUserOfSuccess: (arg: () => void) => void;
    isPopUpShown: string;
}

interface DispatchProps {
    uploadImg: (img: string) => {};
}

interface StateProps {
    modalPopUpsState: { [key: string]: boolean };
}

interface State {
    errorMessage: string | null;
    isDropZoneHidden: boolean;
    isImgCropHidden: boolean;
    isCanvasBlank: boolean;
    imgAsBase64: string;
    fileExtension: string | null;
    dropCropContainerHeight: string;
    dropCropContainerWidth: string;
    crop: {
        aspect: number;
    };
}

type Props = OwnProps & DispatchProps & StateProps;
type resolve = (value?: {} | PromiseLike<{}> | undefined) => void;
type crop = {
    x: number;
    y: number;
    width: number;
    height: number;
    aspect: number;
};

class UploadImgFile extends React.Component<Props, State> {
    private imgRequirements = {
        maxSizeInBytes: 5000000,
        isMorethenOneImgAllowed: false,
        typeOfImgsAllowed: "image/gif, image/jpeg, image/png",
        imgHeight: 200,
        imgWidth: 200
    };

    private dropCropContainerDefault = {
        height: "100%",
        width: "100%"
    };

    private imagePreviewCanvasRef: React.RefObject<HTMLCanvasElement>;

    public state: State = {
        errorMessage: null,
        isDropZoneHidden: false,
        isImgCropHidden: true,
        isCanvasBlank: true,
        imgAsBase64: "",
        fileExtension: null,
        dropCropContainerHeight: this.dropCropContainerDefault.height,
        dropCropContainerWidth: this.dropCropContainerDefault.width,
        crop: {
            aspect: 1 / 1
        }
    };

    constructor(props: Props) {
        super(props);
        this.imagePreviewCanvasRef = React.createRef();
    }

    public base64StringtoFile = (base64String: string, filename: string) => {
        const arr: string[] = base64String.split(",");
        const mime: string = arr[0].match(/:(.*?);/)![1];
        const bstr: string = atob(arr[1]);
        let bstrLength: number = bstr.length;
        const u8arr = new Uint8Array(bstrLength);

        while (bstrLength--) {
            u8arr[bstrLength] = bstr.charCodeAt(bstrLength);
        }

        return new File([u8arr], filename, { type: mime });
    };

    public extractImageFileExtensionFromBase64(base64Data: string) {
        return base64Data.substring(
            "data:image/".length,
            base64Data.indexOf(";base64")
        );
    }

    public image64toCanvasRef = (
        canvasRef: HTMLCanvasElement,
        pixelCrop: crop
    ) => {
        const image: HTMLImageElement = new Image();
        image.src = this.state.imgAsBase64;
        image.onload = () => {
            const canvas = canvasRef;
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                pixelCrop.width,
                pixelCrop.height
            );

            this.setState(() => {
                return {
                    isCanvasBlank: false
                };
            });
        };
    };

    public resetStateAndCanvasToDefault = (): void => {
        const canvasRef = this.imagePreviewCanvasRef
            .current as HTMLCanvasElement;

        if (canvasRef !== null) {
            const ctx = canvasRef.getContext("2d") as CanvasRenderingContext2D;
            ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);
        }

        this.setState(() => {
            return {
                errorMessage: null,
                isDropZoneHidden: false,
                isImgCropHidden: true,
                isButtonsHidden: true,
                isCanvasBlank: true,
                imgAsBase64: "",
                fileExtension: null,
                dropCropContainerHeight: this.dropCropContainerDefault.height,
                dropCropContainerWidth: this.dropCropContainerDefault.width,
                crop: { aspect: 1 / 1 }
            };
        });
    };

    public handleOnDrop = (file: Blob[], rejectedFile: Blob[]): void => {
        (async () => {
            const isFileValid: boolean = (await this.checkImgForErrors(
                file,
                rejectedFile
            )) as boolean;

            if (!isFileValid) {
                return;
            }

            this.setState(() => {
                return { isDropZoneHidden: true, errorMessage: null };
            });

            this.addUploadedImgToPage();
        })();
    };

    public checkImgForErrors = (
        file: Blob[],
        rejectedFile: Blob[]
    ): Promise<boolean | {}> => {
        return new Promise((resolve: resolve) => {
            (async () => {
                if (rejectedFile && rejectedFile.length > 0) {
                    this.handleRejectedFile(rejectedFile[0]);
                    resolve(false);
                }

                if (file && file.length > 0) {
                    const imgAsBase64 = (await this.getImgAsBase64(
                        file[0]
                    )) as string;

                    this.setState(() => {
                        return {
                            imgAsBase64
                        };
                    });

                    resolve(await this.checkForValidImgDimensions());
                }
            })();
        });
    };

    public clearErrorMessage = () => {
        if (this.state.errorMessage !== null) {
            this.setState(() => {
                return {
                    errorMessage: null
                };
            });
        }
    };

    public handleRejectedFile(currentRejectedFile: Blob): void {
        let errorMessage: string =
            "Unaccepted File Type. Must be either JPEG, PNG or GIF.";
        if (currentRejectedFile.size > this.imgRequirements.maxSizeInBytes) {
            errorMessage = "This file is to big, must be under 5mb.";
        }

        this.setState(() => {
            return { errorMessage: errorMessage };
        });
    }

    public getImgAsBase64 = (imgAsBlob: Blob): Promise<string | {}> => {
        return new Promise((resolve: resolve) => {
            const Reader: FileReader = new FileReader();

            Reader.addEventListener(
                "load",
                (): void => {
                    resolve(Reader.result as string);
                }
            );

            Reader.readAsDataURL(imgAsBlob);
        });
    };

    public checkForValidImgDimensions = (): Promise<boolean | {}> => {
        return new Promise((resolve: resolve) => {
            const Img: HTMLImageElement = new Image();

            Img.onload = (): void => {
                if (Img.width <= 200 || Img.height <= 200) {
                    this.setState(() => {
                        return {
                            errorMessage:
                                "This file is to small in either width or height."
                        };
                    });
                    resolve(false);
                    return;
                }

                this.setDropCropContainerDimensions(Img.height, Img.width);

                resolve(true);
            };

            Img.src = this.state.imgAsBase64;
        });
    };

    public setDropCropContainerDimensions(height: number, width: number): void {
        let widthPercent: string;
        let heightPercent: string;

        if (height < width) {
            heightPercent = (height * 100) / width + "%";
            widthPercent = "100%";
        } else if (height > width) {
            widthPercent = (width * 100) / height + "%";
            heightPercent = "100%";
        } else {
            widthPercent = "100%";
            heightPercent = "100%";
        }

        this.setState(() => {
            return {
                dropCropContainerHeight: heightPercent,
                dropCropContainerWidth: widthPercent
            };
        });
    }

    public addUploadedImgToPage = (): void => {
        this.setState(() => {
            return {
                isImgCropHidden: false,
                fileExtension: this.extractImageFileExtensionFromBase64(this
                    .state.imgAsBase64 as string)
            };
        });
    };

    public handleOnCropChange = (crop: crop): void => {
        this.clearErrorMessage();

        this.setState(() => {
            return {
                crop
            };
        });
    };

    // @ts-ignore
    // need to ignore becasue the first argument (crop) is never used
    // and it will throw an error if a value is not read or console.log()
    public handleOnCropComplete = (crop: crop, pixelCrop: crop): void => {
        this.clearErrorMessage();

        const canvasRef = this.imagePreviewCanvasRef
            .current as HTMLCanvasElement;

        this.image64toCanvasRef(canvasRef, pixelCrop);
    };

    public submit = (): void => {
        if (!this.state.isCanvasBlank) {
            const fileExtension = this.state.fileExtension;
            const canvasRef = this.imagePreviewCanvasRef
                .current as HTMLCanvasElement;
            const imgData64: string = canvasRef.toDataURL(
                "image/" + fileExtension
            );
            const myfileName = "user-image." + fileExtension;

            const myNewCroppedFile: Blob = this.base64StringtoFile(
                imgData64,
                myfileName
            );

            this.uploadImageFileToServer(myNewCroppedFile);
            return;
        }

        this.setState(() => {
            return {
                errorMessage:
                    this.state.imgAsBase64 === null
                        ? "Please Drag & drop a file or browse for images."
                        : "You still need to crop the image."
            };
        });
    };

    public uploadImageFileToServer(imgFile: Blob): void {
        (async () => {
            const imgAsBase64 = (await this.getImgAsBase64(imgFile)) as string;

            this.props.dislayLoader();

            axios
                .get("https://reqres.in/api/users?delay=3")
                .then(() => {
                    this.props.uploadImg(imgAsBase64);
                    this.props.notifyUserOfSuccess(() => {});
                })
                .catch(() => {
                    this.setState(() => {
                        return {
                            errorMessage:
                                "Sorry, something went wrong. Please try again."
                        };
                    });
                });
        })();
    }

    public componentWillReceiveProps(nextProps: StateProps): void {
        if (!nextProps.modalPopUpsState[this.props.isPopUpShown]) {
            this.resetStateAndCanvasToDefault();
        }
    }

    public render(): React.ReactNode {
        const dropCropContainerDemensions: { height: string; width: string } = {
            height: this.state.dropCropContainerHeight,
            width: this.state.dropCropContainerWidth
        };

        type IconData = {
            containerClassName: string;
            className: string;
            colorAndSizeClassName: string;
        };
        const iconData1: IconData = {
            containerClassName: "crop-icon",
            className: "fa-crop-alt",
            colorAndSizeClassName: "icon-green-xlg"
        };
        const iconData2: IconData = {
            containerClassName: "upload-icon",
            className: "fa-cloud-upload-alt",
            colorAndSizeClassName: "icon-green-xlg"
        };

        return (
            <React.Fragment>
                <div className="upload-img-container">
                    <div className="upload-img-error-message-container">
                        <p className="upload-img-error-message">
                            {this.state.errorMessage}
                        </p>
                    </div>
                    <div className="canvas-container">
                        <Icon iconData={iconData1} />
                        <p className="canvas-para">Crop preview</p>

                        <canvas
                            className="canvas"
                            ref={this.imagePreviewCanvasRef}
                        />
                    </div>
                    <div className="drop-crop-and-sucess-container-outer">
                        <div
                            style={dropCropContainerDemensions}
                            className="drop-crop-and-sucess-container-inner"
                        >
                            <DropZone
                                onDrop={this.handleOnDrop}
                                maxSize={this.imgRequirements.maxSizeInBytes}
                                multiple={
                                    this.imgRequirements.isMorethenOneImgAllowed
                                }
                                accept={this.imgRequirements.typeOfImgsAllowed}
                                className={
                                    this.state.isDropZoneHidden
                                        ? "drop-zone-container is-hidden"
                                        : "drop-zone-container"
                                }
                            >
                                <Icon iconData={iconData2} />
                                <div className="drop-zone-para">
                                    <p>Drag & drop file</p>
                                    <p>or</p>
                                    <p className="browse">Browse</p>
                                </div>
                                <div className="drop-zone-requirements">
                                    <p>JPEG, PNG, GIF</p>
                                    <p>5mb file limit</p>
                                    <p>Min size 200x200 pixels</p>
                                </div>
                            </DropZone>

                            <ImgCrop
                                className={
                                    this.state.isImgCropHidden
                                        ? "img-crop-container is-hidden"
                                        : "img-crop-container"
                                }
                                src={this.state.imgAsBase64}
                                crop={this.state.crop}
                                onChange={this.handleOnCropChange}
                                onComplete={this.handleOnCropComplete}
                            />
                        </div>
                        <div className="modal-upload-popup-buttons-container">
                            <Button
                                clickEvent={this.submit}
                                text={"Submit"}
                                type={"submit"}
                                classes={"btn-primary btn-sm"}
                            />
                            <Button
                                clickEvent={this.resetStateAndCanvasToDefault}
                                text={"Reset"}
                                type={"button"}
                                classes={"btn-red btn-sm"}
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return bindActionCreators(
        {
            uploadImg
        },
        dispatch
    );
};

const mapStateToProps = (state: AppState) => {
    return { modalPopUpsState: state.modalPopUps };
};

const uploadImgFile = connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadImgFile);

export default ModalAniAndSuccContainer(uploadImgFile);

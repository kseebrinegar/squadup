import * as React from "react";
import DropZone from "react-dropzone";
// @ts-ignore
// having trouble with setting up types with it
import ImgCrop from "react-image-crop";

import Button from "../../buttons/button";

interface IProps {
    toggleDisplayPopUpModal: () => void;
}

interface IState {
    errorMessage: string | null;
    isDropZoneHidden: boolean;
    isImgCropHidden: boolean;
    isButtonsHidden: boolean;
    isCanvasBlank: boolean;
    originalImgAsBase64: string | null;
    fileExtension: string | null;
    dropCropContainerHeight: string;
    dropCropContainerWidth: string;
    crop: {
        aspect: number;
    };
}

type resolve = (value?: {} | PromiseLike<{}> | undefined) => void;

type FileBlob = Record<string, number | Date | string | {}>;

class UploadImgFile extends React.Component<IProps, IState> {
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

    public state: IState = {
        errorMessage: null,
        isDropZoneHidden: false,
        isImgCropHidden: true,
        isButtonsHidden: true,
        isCanvasBlank: true,
        originalImgAsBase64: null,
        fileExtension: null,
        dropCropContainerHeight: this.dropCropContainerDefault.height,
        dropCropContainerWidth: this.dropCropContainerDefault.width,
        crop: {
            aspect: 1 / 1
        }
    };

    constructor(props: IProps) {
        super(props);
        this.imagePreviewCanvasRef = React.createRef();
    }

    public base64StringtoFile = (base64String: any, filename: any) => {
        var arr = base64String.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    public extractImageFileExtensionFromBase64(base64Data: any) {
        return base64Data.substring(
            "data:image/".length,
            base64Data.indexOf(";base64")
        );
    }

    public image64toCanvasRef = (canvasRef: any, pixelCrop: any) => {
        const image = new Image();
        image.src = this.state.originalImgAsBase64 as string;
        image.onload = () => {
            const canvas = canvasRef;
            canvas.width = pixelCrop.width;
            canvas.height = pixelCrop.height;
            const ctx = canvas.getContext("2d");
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

    public resetStateAndCanvasToDefault = (canvasRef: any): void => {
        const ctx = canvasRef.getContext("2d");

        ctx.clearRect(0, 0, canvasRef.width, canvasRef.height);

        this.setState(() => {
            return {
                errorMessage: null,
                isDropZoneHidden: false,
                isImgCropHidden: true,
                isButtonsHidden: true,
                isCanvasBlank: true,
                originalImgAsBase64: null,
                fileExtension: null,
                dropCropContainerHeight: this.dropCropContainerDefault.height,
                dropCropContainerWidth: this.dropCropContainerDefault.width,
                crop: {
                    aspect: 1 / 1
                }
            };
        });
    };

    public handleOnDrop = (files: object, rejectedFiles: object): void => {
        (async () => {
            const isFileDimensionsValid: boolean = (await this.checkImgForErrors(
                files as FileBlob[],
                rejectedFiles as FileBlob[]
            )) as boolean;

            if (!isFileDimensionsValid) {
                return;
            }

            this.setState(() => {
                return { isDropZoneHidden: true, errorMessage: null };
            });

            this.addUploadedImgToPage();
        })();
    };

    public checkImgForErrors = (
        files: FileBlob[],
        rejectedFiles: FileBlob[]
    ): Promise<boolean | {}> => {
        return new Promise((resolve: resolve) => {
            (async () => {
                if (rejectedFiles && rejectedFiles.length > 0) {
                    this.handleRejectedFile(rejectedFiles[0]);
                    resolve(false);
                }

                if (files && files.length > 0) {
                    await this.setStateImgAsBase64(files[0]);
                    resolve(await this.checkForValidImgDimensions());
                }
            })();
        });
    };

    public handleRejectedFile(currentRejectedFile: FileBlob): void {
        let errorMessage: string =
            "Unaccepted File Type. Must be either JPEG, PNG or GIF.";
        if (currentRejectedFile.size > this.imgRequirements.maxSizeInBytes) {
            errorMessage = "This file is to big, must be under 5mb.";
        }

        this.setState(() => {
            return { errorMessage: errorMessage };
        });
    }

    public setStateImgAsBase64 = (imgAsBlob: FileBlob) => {
        return new Promise(resolve => {
            const Reader = new FileReader();

            Reader.addEventListener(
                "load",
                (): void => {
                    this.setState(() => {
                        return { originalImgAsBase64: Reader.result as string };
                    });

                    resolve();
                }
            );

            Reader.readAsDataURL(imgAsBlob);
        });
    };

    public checkForValidImgDimensions = () => {
        return new Promise(resolve => {
            const Img = new Image();

            Img.onload = () => {
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

            Img.src = this.state.originalImgAsBase64 as string;
        });
    };

    public setDropCropContainerDimensions(height: number, width: number) {
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
                fileExtension: this.extractImageFileExtensionFromBase64(
                    this.state.originalImgAsBase64
                )
            };
        });
    };

    public handleOnCropChange = (crop: any): void => {
        this.setState(() => {
            return {
                crop: crop
            };
        });
    };

    public handleOnCropComplete = (crop: any, pixelCrop: any): void => {
        console.log(crop);
        const canvasRef = this.imagePreviewCanvasRef.current;

        this.image64toCanvasRef(canvasRef, pixelCrop);
    };

    public submit = (canvasRef: any): void => {
        if (!this.state.isCanvasBlank) {
            const imgData64 = canvasRef.toDataURL(
                "image/" + this.state.fileExtension
            );
            console.log(imgData64);
            //const myfileName = "user-image." + fileExtension;

            // const myNewCroppedFile = this.base64StringtoFile(imgData64, myfileName);

            this.resetStateAndCanvasToDefault(canvasRef);
            return;
        }

        this.setState(() => {
            return {
                errorMessage:
                    this.state.originalImgAsBase64 === null
                        ? "Please Drag & drop a file or browse for images."
                        : "You still need to crop the image."
            };
        });
    };

    public render(): JSX.Element {
        const dropCropContainerDemensions = {
            height: this.state.dropCropContainerHeight,
            width: this.state.dropCropContainerWidth
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
                        <div className="icon-container crop-icon">
                            <p className="fas fa-fw fa-crop-alt icon-green-xlg" />
                        </div>
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
                                <div className="icon-container upload-icon">
                                    <p className="fas fa-fw fa-cloud-upload-alt icon-green-xlg" />
                                </div>
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
                                src={this.state.originalImgAsBase64}
                                crop={this.state.crop}
                                onChange={this.handleOnCropChange}
                                onComplete={this.handleOnCropComplete}
                            />
                        </div>
                        <div
                            className={
                                this.state.isButtonsHidden
                                    ? "modal-XL-popup-buttons-container "
                                    : "modal-XL-popup-buttons-container"
                            }
                        >
                            <Button
                                clickEvent={(): void => {
                                    const canvasRef = this.imagePreviewCanvasRef
                                        .current;
                                    this.submit(canvasRef);
                                }}
                                text={"Submit"}
                                type={"submit"}
                                classes={"btn-primary btn-sm"}
                            />
                            <Button
                                clickEvent={(): void => {
                                    const canvasRef = this.imagePreviewCanvasRef
                                        .current;
                                    this.resetStateAndCanvasToDefault(
                                        canvasRef
                                    );
                                }}
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

export default UploadImgFile;

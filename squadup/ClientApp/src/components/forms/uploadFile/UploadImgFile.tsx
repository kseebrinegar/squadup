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

type crop = {
    x: number;
    y: number;
    width: number;
    height: number;
    aspect: number;
};

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

    public base64StringtoFile = (base64String: string, filename: any) => {
        var arr = base64String.split(","),
            // @ts-ignore
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
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
        image.src = this.state.originalImgAsBase64 as string;
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
        const ctx = canvasRef.getContext("2d") as CanvasRenderingContext2D;
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
                    await this.setStateImgAsBase64(file[0]);
                    resolve(await this.checkForValidImgDimensions());
                }
            })();
        });
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

    public setStateImgAsBase64 = (imgAsBlob: Blob): Promise<{}> => {
        return new Promise((resolve: resolve) => {
            const Reader: FileReader = new FileReader();

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

            Img.src = this.state.originalImgAsBase64 as string;
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
                    .state.originalImgAsBase64 as string)
            };
        });
    };

    public handleOnCropChange = (crop: crop): void => {
        this.setState(() => {
            return {
                crop
            };
        });
    };

    // @ts-ignore
    public handleOnCropComplete = (crop: crop, pixelCrop: crop): void => {
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
            console.log(myNewCroppedFile);
            this.resetStateAndCanvasToDefault();
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

export default UploadImgFile;

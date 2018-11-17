import types, { PayloadedAction, createPayloadedAction } from "./types";

export interface ActionImgUpload
    extends PayloadedAction<types.UPLOAD_IMG, string> {}

const uploadImg = createPayloadedAction<ActionImgUpload>(types.UPLOAD_IMG);

export default uploadImg;

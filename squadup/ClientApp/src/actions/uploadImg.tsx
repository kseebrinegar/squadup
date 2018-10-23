const uploadImg = (img: string) => {
    return {
        type: "UPLOAD_IMG",
        payload: img
    };
};

export default uploadImg;

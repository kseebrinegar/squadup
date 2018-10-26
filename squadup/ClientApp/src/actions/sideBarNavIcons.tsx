import axios from "axios";
import { Dispatch } from "redux";

const sideBarNavIcons = () => {
    return (dispatch: Dispatch) => {
        axios.get("https://reqres.in/api/unknown/2").then((res: any) => {
            console.log(res.data);
            dispatch({
                type: "UPDATE_SIDE_BAR_NAV_ICONS_COUNTER"
            });
        });
    };
};

export default sideBarNavIcons;

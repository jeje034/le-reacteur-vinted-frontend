import Cookies from "js-cookie";
import { IUserIds } from "../sharedInterfaces/IUserIds";

const SaveUserIds = (userIds: IUserIds) => {
    if (userIds && userIds.userToken) {
        Cookies.set("token", userIds.userToken, { expires: 7 });
        Cookies.set("userId", userIds.userId, { expires: 7 });
    } else {
        Cookies.remove("token");
        Cookies.remove("userId");
    }
};

export default SaveUserIds;

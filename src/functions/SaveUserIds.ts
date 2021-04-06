import Cookies from "js-cookie";

const SaveUserIds = (userToken: string, userId: string) => {
    if (userToken) {
        Cookies.set("token", userToken, { expires: 7 });
        Cookies.set("userId", userId, { expires: 7 });
    } else {
        Cookies.remove("token");
        Cookies.remove("userId");
    }
};

export default SaveUserIds;

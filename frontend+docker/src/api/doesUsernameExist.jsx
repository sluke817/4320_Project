import getUserInfo from "./getUserInfo";

export default async function doesUsernameExist(username) {
    try {
        await getUserInfo(username);
        return true;
    } catch (err) {
        return false;
    }
}

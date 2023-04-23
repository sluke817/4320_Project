import getUserInfo from "./getUserInfo";

export default async function doesUsernameExist(username) {
    try {
        const user = await getUserInfo(username);
        if (user.username !== '') {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

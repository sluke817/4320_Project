import getUserInfo from "./getUserInfo";

export default async function isCorrectLoginInfo(username, password) {
    try {
        const user = await getUserInfo(username);
        const expectedPassword = user.data[1][0].password;
        if (expectedPassword === password) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
    }
}

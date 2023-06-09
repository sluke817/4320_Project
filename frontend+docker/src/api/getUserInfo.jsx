import axios from 'axios'
import url from './url'

export default async function getUserInfo(username) {
    try {
        const res = await axios.get(`${url}/get-user-info/${username}`);
        return res.data[1][0];
    } catch (err) {
        console.log(err);
    }
}

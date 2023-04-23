import axios from "axios";
import url from "./url";

/* Example parameter:
record = {
    'username': 'kraken',
    'password': 'password',
    'fname': 'Kraken',
    'lname': 'Krakenson',
    'email': 'somedudenamedkraken@fakeemail.com',
    'cell_phone': '123-456-7890',
    'hours_available': '5',
    'postal_address': '12345 Main Street, Columbia, MO 65201'
}

Note: Request will create OR edit a user depending on given username
*/
export default async function setUserInfo(record) {
    try {
        return await axios.post(`${url}/add-edit`, JSON.stringify(record));
    } catch (err) {
        console.log(err);
    }
}

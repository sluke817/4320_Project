import { useEffect, useState } from "react";
import getUserInfo from "../api/getUserInfo";
import setUserInfo from "../api/setUserInfo";

export default function ViewAccountDetails(props) {
    const { user } = props;
    const [details, setDetails] = useState("");
    useEffect(() => {
        getUserInfo(user).then((response) => setDetails(response));
    }, [user]);

    async function updateDetails(event) {
        event.preventDefault();

        try {
            const fName = event.target[1].value;
            const lName = event.target[2].value;
            const email = event.target[3].value;
            const phone = event.target[4].value;
            const hours = event.target[5].value;
            const address = event.target[6].value;

            console.log(event.target)

            const record = {
                'username': user,
                'password': details.password,
                'fname': fName,
                'lname': lName,
                'email': email,
                'cell_phone': phone,
                'hours_available': hours,
                'postal_address': address
            }
            await setUserInfo(record);
            setDetails(record);
            alert("Your changes have been saved successfully.")
        } catch (error) {
            console.log(error);
            alert("An error has occurred.")
        }
    }

    return (
        <div className="container">
            <form className="well form-horizontal" action=" " method="get" id="account_details" onSubmit={(event) => updateDetails(event)}>
                <fieldset>
                    <legend>Account Details</legend>
                    <div className="form-group">
                        <p><strong>First Name: </strong></p><input type="text" defaultValue={details.fname} />
                        <p><strong>Last Name: </strong></p><input type="text" defaultValue={details.lname} />
                        <p><strong>Email: </strong></p><input type="text" defaultValue={details.email} />
                        <p><strong>Phone Number: </strong></p><input type="text" defaultValue={details.cell_phone} />
                        <p><strong>Available Hours Per Month: </strong></p><input type="text" defaultValue={details.hours_available} />
                        <p><strong>Address: </strong></p><input type="text" defaultValue={details.postal_address} />
                    </div>
                </fieldset>
                <br></br>
                <button>Save Changes</button>
            </form>
        </div>
    )
}

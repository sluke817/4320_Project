import { useEffect, useState } from "react";
import getUserInfo from "../api/getUserInfo";

export default function ViewAccountDetails(props) {
    const { user } = props;
    const [details, setDetails] = useState("");
    useEffect(() => {
        getUserInfo(user).then((response) => setDetails(response));
    }, [user]);

    return (
        <div class="container">
            <form class="well form-horizontal" action=" " method="get" id="account_details">
                <fieldset>
                    <legend>Account Details</legend>
                    <div class="form-group">
                        <p><strong>First Name: </strong>{details.fname}</p>
                        <p><strong>Last Name:</strong>{details.lname}</p>
                        <p><strong>Email: </strong>{details.email}</p>
                        <p><strong>Phone Number:</strong>{details.cell_phone}</p>
                        <p><strong>Address: </strong>{details.postal_address}</p>
                    </div>

                </fieldset>
            </form>
        </div>
    )
}

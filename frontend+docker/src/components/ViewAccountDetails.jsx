import { useEffect, useState } from "react";
import getUserInfo from "../api/getUserInfo";

export default function ViewAccountDetails(props) {
    const { user } = props;
    const [details, setDetails] = useState("");
    useEffect(() => {
        getUserInfo(user).then((response) => setDetails(response));
    });

    return (
        <div class="container">
            <form class="well form-horizontal" action=" " method="get"  id="account_details">
        <fieldset>
        <legend>Account Details</legend>
        <div class="form-group">
        <label class="col-md-4 control-label">First Name</label>  
        <div class="col-md-4 inputGroupContainer">
            <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                <p>{details.name}</p>
            </div>
        </div>
        </div>
        <div class="form-group">
        <label class="col-md-4 control-label" >Last Name</label> 
            <div class="col-md-4 inputGroupContainer">
            <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                <p></p>
            </div>
        </div>
        </div>

        <div class="form-group">
        <label class="col-md-4 control-label">E-Mail</label>  
            <div class="col-md-4 inputGroupContainer">
            <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                <p>{user.Lname}</p>
            </div>
        </div>
        </div>
            
        <div class="form-group">
        <label class="col-md-4 control-label">Phone #</label>  
            <div class="col-md-4 inputGroupContainer">
            <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
                <p>{user.Pn}</p>
            </div>
        </div>
        </div>
            
        <div class="form-group">
        <label class="col-md-4 control-label">Hours Available</label>  
            <div class="col-md-4 inputGroupContainer">
            <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                <p>{user.Hours}</p>
            </div>
        </div>
        </div>
        
        <div class="form-group">
        <label class="col-md-4 control-label">Address</label>  
            <div class="col-md-4 inputGroupContainer">
            <div class="input-group">
                <span class="input-group-addon"><i class="glyphicon glyphicon-home"></i></span>
                <p>{user.Addr}</p>
            </div>
        </div>
        </div>

        <div class="form-group">
        <label class="col-md-4 control-label"></label>
        <div class="col-md-4">
            <button type="submit" class="btn btn-warning" >Edit Details<span class="glyphicon glyphicon-send"></span></button>
        </div>
        </div>

        </fieldset>
        </form>
        </div>
    )
}

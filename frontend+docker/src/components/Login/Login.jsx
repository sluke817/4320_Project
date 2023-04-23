import { useState } from "react";
import isCorrectLoginInfo from "../../api/isCorrectLoginInfo";
import doesUsernameExist from "../../api/doesUsernameExist";
import setUserInfo from "../../api/setUserInfo";
import './Login.css';

export default function Login(props) {
    const { setUser } = props;
    const [header, setHeader] = useState("Login");
    const [error, setError] = useState('');

    async function attemptLogin(event) {
        event.preventDefault();

        const username = event.target[0].value;
        const password = event.target[1].value;

        try {
            const attempt = await isCorrectLoginInfo(username, password);
            if (attempt) {
                setUser(username);
            } else {
                throw new Error("Incorrect password.");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    async function attemptCreateAccount(event) {
        event.preventDefault();

        const username = event.target[0].value;
        const password1 = event.target[1].value;
        const password2 = event.target[2].value;
        const email = event.target[3].value;

        try {
            const exists = await doesUsernameExist(username);
            if (!exists) {
                if (password1 !== password2) {
                    throw new Error("Passwords don't match.");
                } else if (password1 === '') {
                    throw new Error("Password is empty.")
                } else if (email === '') {
                    throw new Error("Email is empty.")
                }
                const record = {
                    'username': username,
                    'password': password1,
                    'fname': '',
                    'lname': '',
                    'email': email,
                    'cell_phone': '',
                    'hours_available': '',
                    'postal_address': ''
                }
                await setUserInfo(record);
                await attemptLogin(event);
            } else {
                throw new Error("Username already exists.");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    async function attemptToEnterSite(event) {
        if (header === "Login") {
            await attemptLogin(event);
        } else {
            await attemptCreateAccount(event);
        }
    }

    function switchHeaderButton() {
        let otherHeader = "";
        let message = "";
        if (header === "Login") {
            otherHeader = "Create Account";
            message = "Need to create an account? ";
        } else {
            otherHeader = "Login";
            message = "Need to log in? ";
        }

        return (
            <button onClick={() => {
                setHeader(otherHeader);
                setError('');
                document.getElementById('username').value = '';
                document.getElementById('password').value = '';
            }}>
                {message + "Click here."}
            </button >
        )
    }

    function emailInput() {
        if (header === 'Create Account') {
            return (
                <div>
                    <input type="email" placeholder="Email"></input>
                    <br></br>
                </div>
            )
        }
    }

    function extraPasswordInput() {
        if (header === 'Create Account') {
            return (
                <div>
                    <input type="password" placeholder="Confirm Password"></input>
                    <br></br>
                </div>
            )
        }
    }

    function displayError() {
        if (error !== '') {
            return (
                <p className="error">{error} Please try again.</p>
            )
        }
    }

    return (
        <div>
            <h1>{header}</h1>
            <form onSubmit={(event) => attemptToEnterSite(event)}>
                <input id="username" type="text" placeholder="Username"></input>
                <br></br>
                <input id="password" type="password" placeholder="Password"></input>
                <br></br>
                {extraPasswordInput()}
                {emailInput()}
                <button onClick={() => setError(false)}>Submit</button>
                {error && displayError()}
            </form>
            <br></br>
            {switchHeaderButton()}
        </div>
    )
}

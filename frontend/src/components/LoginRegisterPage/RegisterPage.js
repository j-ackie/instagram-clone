import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import PostDataService from "../../services/PostDataService";
import UserDataService from "../../services/UserDataService";
import instagramLogo from "../../icons/instagram_logo.png";
import PasswordField from "./PasswordField";
import "./LoginRegisterPage.css"

export default function RegisterPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    const isFilledOut = () => {
        return username !== "" && password !== "" && confirmPassword !== "";
    }

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const data = {
            username: username,
            password: password
        };
        UserDataService.register(data)
            .then(response => {
                navigate("/login", {
                    state: state
                });
            });
    }

    return (
        <div className="login-register-page">
            <div className="login-register-container" id="register-container">
                <img
                    src={ instagramLogo }
                />
                <input 
                    value={ username }
                    placeholder="Username"
                    onChange={ event => setUsername(event.target.value) }
                />
                <PasswordField
                    password={ password }
                    setPassword={ setPassword }
                    placeholder="Password"
                    isNewPassword={ true }
                />
                <PasswordField
                    password={ confirmPassword }
                    setPassword={ setConfirmPassword }
                    placeholder="Confirm password"
                    isNewPassword={ true }
                />
                <button
                    onClick={ handleSubmit }
                    className="submit"
                    disabled={ !isFilledOut() }
                >
                    Sign up
                </button>
            </div>
            <div className="alternative-container">
                <span>
                    <p>
                        Have an account? <span onClick={ () => navigate("/login") } id="register">Log in</span>
                    </p>
                </span>
            </div>
        </div>
    )
}
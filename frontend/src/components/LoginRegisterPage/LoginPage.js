import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginContainer from "./LoginContainer";
import PostDataService from "../../services/PostDataService";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import instagramLogo from "../../icons/instagram_logo.png";
import PasswordField from "./PasswordField";
import "./LoginRegisterPage.css"

export default function LoginPage(props) {
    const navigate = useNavigate();

    return (
        <div className="login-register-page">
            <LoginContainer />
            <div className="alternative-container">
                <span>
                    <p>
                        Don't have an account? <span onClick={ () => navigate("/register") } id="register">Sign up</span>
                    </p>
                </span>
            </div>
        </div>
    )
}
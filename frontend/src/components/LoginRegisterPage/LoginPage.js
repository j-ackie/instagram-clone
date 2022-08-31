import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import instagramLogo from "../../icons/instagram_logo.png";
import PasswordField from "./PasswordField";
import "./LoginRegisterPage.css"

export default function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        let data = {
            username: username,
            password: password
        };
        PostDataService.login(data)
            .then(response => {
                console.log(response)
                let userInfo = {
                    userId: response.data.userId,
                    username: data.username,
                    profilePicture: response.data.profilePicture
                };
                props.setUserInfo(userInfo);
                localStorage.setItem("userInfo", JSON.stringify(userInfo));
                navigate("/");
            })
            .catch(err => {
                // Alert that user has inputted an incorrect password
                console.log(err);
            });
    }
    return (
        <div className="login-register-page">
            <div id="login-container">
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
                />
                <button
                    onClick={ handleSubmit }
                    className="submit"
                    disabled={ username === "" || password === "" }
                >
                    Log In
                </button>
            </div>
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
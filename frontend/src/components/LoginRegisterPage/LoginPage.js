import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import instagramLogo from "../../icons/instagram_logo.png";
import "./LoginRegisterPage.css"

export default function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = () => {
        if (username !== "" && password !== "") {
            let data = {
                username: username,
                password: password
            };
            PostDataService.login(data)
                .then(response => {
                    console.log(response);
                    if (response.data.status === "success") {
                        let userInfo = {
                            userId: response.data._id,
                            username: data.username,
                            profile_picture: response.data.profile_picture
                        };
                        props.setUserInfo(userInfo);
                        navigate("/");
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
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
                <input 
                    type="password"
                    value={ password }
                    placeholder="Password"
                    onChange={ event => setPassword(event.target.value) }
                />
                <button
                    onClick={ handleSubmit }
                    className={
                        username !== "" && password !== ""
                            ? "enabled"
                            : "disabled"    
                    }
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
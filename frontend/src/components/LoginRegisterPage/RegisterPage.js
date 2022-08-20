import { useState } from "react";
import { useNavigate } from "react-router";
import PostDataService from "../../services/PostDataService";
import instagramLogo from "../../icons/instagram_logo.png";
import "./LoginRegisterPage.css"

export default function RegisterPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const isFilledOut = () => {
        return username !== "" && password !== "" && confirmPassword !== "";
    }

    const handleSubmit = () => {
        if (!isFilledOut()) {
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        }
        let data = {
            username: username,
            password: password
        };
        PostDataService.register(data)
            .then(response => {
                if (response.data.status === "success") {
                    let userInfo = {
                        userId: response.data.userId,
                        username: data.username,
                        profile_picture: ""
                    };
                    props.setUserInfo(userInfo);
                    navigate("/");
                }
            })
    }

    return (
        <div className="login-register-page">
            <div id="register-container">
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
                <input
                    type="password"
                    value={ confirmPassword }
                    placeholder="Confirm password"
                    onChange={ event => setConfirmPassword(event.target.value) }
                />
                <button
                    onClick={ handleSubmit }
                    className={
                        isFilledOut()
                            ? "enabled"
                            : "disabled"    
                    }
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
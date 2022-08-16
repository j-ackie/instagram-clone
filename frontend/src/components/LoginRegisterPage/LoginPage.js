import { useState } from "react";
import PostDataService from "../../services/PostDataService";
import instagramLogo from "../../icons/instagram_logo.png";

export default function LoginPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
                        props.setUserInfo(response.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    return (
        <div>
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
                        Don't have an account? <span onClick={ () => props.setIsLogin(false) } id="register">Sign up</span>
                    </p>
                </span>
            </div>
        </div>
    )
}
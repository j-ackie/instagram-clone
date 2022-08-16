import { useState } from "react";
import PostDataService from "../../services/PostDataService";
import instagramLogo from "../../icons/instagram_logo.png";

export default function RegisterPage(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        if (username !== "" && password !== "" && confirmPassword !== "") {
            // TODO: Implement service
        }
    }

    return (
        <div>
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
                        username !== "" && password !== "" && confirmPassword !== ""
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
                        Have an account? <span onClick={ () => props.setIsLogin(true) } id="register">Log in</span>
                    </p>
                </span>
            </div>
        </div>
    )
}
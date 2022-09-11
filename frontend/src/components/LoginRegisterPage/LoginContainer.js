import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import PostDataService from "../../services/PostDataService";
import PasswordField from "./PasswordField";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import instagramLogo from "../../icons/instagram_logo.png";
import UserContext from "../../UserProvider";

export default function LoginContainer(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    const [userInfo, setUserInfo] = useContext(UserContext);

    const handleSubmit = () => {
        const data = {
            username: username,
            password: password
        };
        PostDataService.login(data)
            .then(response => {
                const newUserInfo = {
                    userId: response.data.userId,
                    username: data.username,
                    profilePicture: response.data.profilePicture === ""
                                        ? DefaultProfilePicture
                                        : response.data.profilePicture
                };
                setUserInfo(newUserInfo);
                if (state) {
                    navigate(state);
                    return;
                }
                if (props.isLoginPage) {
                    navigate("/");
                }
                navigate(0);
            })
            .catch(err => {
                // Alert that user has inputted an incorrect password
                console.log(err);
            });
    }

    return (
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
    )
}
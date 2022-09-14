import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import PostDataService from "../../services/PostDataService";
import PasswordField from "./PasswordField";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import instagramLogo from "../../icons/instagram_logo.png";
import UserContext from "../../UserProvider";
import UserDataService from "../../services/UserDataService";

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
        UserDataService.login(data)
            .then(response => {
                UserDataService.getLogin()
                    .then(response => {
                        if (!response.data.loggedIn) {
                            return;
                        }

                        const newUserInfo = response.data.userInfo;

                        if (newUserInfo.profilePicture === "") {
                            newUserInfo.profilePicture = DefaultProfilePicture;
                        }

                        setUserInfo(newUserInfo);

                        if (state) {
                            navigate(state);
                            return;
                        }
                        if (props.isLoginPage) {
                            navigate("/");
                        }
                        else {
                            navigate(0);
                        }
                    })
            })
            .catch(err => {
                // Alert that user has inputted an incorrect password
                console.log(err);
            });
    }

    return (
        <div className="login-register-container" id="login-container">
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
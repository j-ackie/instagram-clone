import { useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import PasswordField from "./PasswordField";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import instagramLogo from "../../icons/instagram_logo.png";
import UserContext from "../../UserProvider";
import AuthDataService from "../../services/AuthDataService";
import { setAuthHeader } from "../../http-common";

export default function LoginContainer(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { state } = useLocation();

    const [, setUserInfo] = useContext(UserContext);

    const handleSubmit = () => {
        const data = {
            username: username,
            password: password
        };
        AuthDataService.login(data)
            .then(response => {
                localStorage.setItem("token", response.data.token);
                setAuthHeader();
                AuthDataService.getLogin()
                    .then(response => {
                        if (!response.data.loggedIn) {
                            return;
                        }

                        const newUserInfo = response.data.userInfo;

                        if (newUserInfo.profilePicture === "") {
                            newUserInfo.profilePicture = defaultProfilePicture;
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
                alert(err.response.data.error);
            });
    }

    return (
        <div className="login-register-container" id="login-container">
            <img
                alt="Instagram logo"
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
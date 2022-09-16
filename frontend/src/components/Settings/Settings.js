import { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import UserContext from "../../UserProvider";
import SettingsTop from "./SettingsTop";
import SettingsSection from "./SettingsSection";
import SettingsField from "./SettingsField";
import SettingsPassword from "./SettingsPassword"
import { handleError, isLoggedIn } from "../../helpers";
import "./Settings.css";
import UserDataService from "../../services/UserDataService";

export default function Settings(props) {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [username, setUsername] = useState(userInfo.username);
    const [bio, setBio] = useState(userInfo.bio);

    const navigate = useNavigate();

    if (!isLoggedIn(userInfo)) {
        return <Navigate to="/login" />
    }

    const isProfileButtonDisabled = () => {
        console.log(username === userInfo.username && bio === userInfo.bio);
        return (username === userInfo.username && bio === userInfo.bio) || username === "";
    }

    const handleProfileButtonClick = () => {
        if (username === "") {
            return;
        }

        const data = {};
        if (username !== userInfo.username) {
            data.username = username;
        }
        if (bio !== userInfo.bio) {
            data.bio = bio;
        }

        UserDataService.updateUser(userInfo.userId, data)
            .then(response => {
                setUserInfo({
                    userId: userInfo.userId,
                    username: data.username ? data.username : userInfo.username,
                    profilePicture: userInfo.profilePicture,
                    bio: data.bio ? data.bio : userInfo.bio
                });
            })
            .catch(err => {
                alert(err.response.data.error);
                handleError(err, { navigate, setUserInfo });
            });
    };

    return (
        <div id="settings-container">
            <div id="settings">
                <SettingsTop />
                <SettingsSection 
                    subheading="Profile Information"
                    isDisabled={ isProfileButtonDisabled }
                    handleClick={ handleProfileButtonClick }
                >
                    <SettingsField
                        fieldName="Username"
                        fieldValue={ username }
                        setFieldValue={ setUsername }
                    />
                    <SettingsField
                        fieldName="Bio"
                        fieldValue={ bio }
                        setFieldValue={ setBio }
                        fieldType={ "textarea" }
                    />
                </SettingsSection>
                <SettingsPassword />
            </div>
        </div>
    )
}
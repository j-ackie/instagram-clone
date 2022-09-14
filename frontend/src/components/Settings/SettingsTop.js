import { useState, useContext } from "react";
import Popup from "../Popup/Popup";
import ProfilePhotoChangePopup from "./ProfilePhotoChangePopup";
import UserContext from "../../UserProvider";

export default function SettingsTop(props) {
    const [isProfilePhotoChangeClicked, setIsProfilePhotoChangeClicked] = useState(false);
    const [userInfo, setUserInfo] = useContext(UserContext);

    return (
        <div id="settings-top">
            <span className="settings-field-left">
                <img
                    className="profile-picture"
                    src={ userInfo.profilePicture }
                />
            </span>
            <span className="settings-field-right">
                <div id="settings-username">
                    { userInfo.username }
                </div>
                <div className="action" onClick={ () => setIsProfilePhotoChangeClicked(true) }>
                    Change profile photo
                </div>
            </span>
            <Popup
                variable={ isProfilePhotoChangeClicked }
                setVariable={ setIsProfilePhotoChangeClicked }
                content={
                    <ProfilePhotoChangePopup 
                        setIsProfilePhotoChangeClicked={ setIsProfilePhotoChangeClicked }
                    />
                }
            />
        </div>
    )
}
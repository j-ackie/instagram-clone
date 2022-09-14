import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import LoginContainer from "../LoginRegisterPage/LoginContainer";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import bookmarkIcon from "../../icons/bookmark.svg";
import gearIcon from "../../icons/gear.svg";
import switchIcon from "../../icons/switch.svg";
import UserContext from "../../UserProvider";
import PostDataService from "../../services/PostDataService";
import UserDataService from "../../services/UserDataService";
import { resetUserInfo } from "../../helpers";

export default function ProfilePicturePopup(props) {
    const [userInfo, setUserInfo] = useContext(UserContext);

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/user/" + userInfo.username);
    }

    const handleSavedClick = () => {
        navigate("/user/" + userInfo.username, {
            state: "saved"
        });
    }

    const handleLogout = () => {
        UserDataService.logout()
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                resetUserInfo(props.setUserInfo);
                navigate("/login")
            })
    };

    return (
        <div id="profile-picture-popup" className="navbar-pop-up">
            <ul onClick={ () => props.setIsProfilePictureClicked(false) }>
                <li onClick={ handleProfileClick }>
                    <img alt="Profile" src={ DefaultProfilePicture } />Profile
                </li>
                <li onClick={ handleSavedClick }>
                    <img alt="Saved" src={ bookmarkIcon } />Saved
                </li>
                <li onClick={ () => navigate("/settings") }>
                    <img alt="Settings" src={ gearIcon } />Settings
                </li>
                <li onClick={ () => props.setIsSwitchIconClicked(true) }>
                    <img  
                        alt="Switch accounts" 
                        src={ switchIcon } 
                    />
                    Switch accounts
                </li>
                <li 
                    id="logout"
                    onClick={ handleLogout }
                >
                    Log Out
                </li>
            </ul>
            
        </div>
    )
}
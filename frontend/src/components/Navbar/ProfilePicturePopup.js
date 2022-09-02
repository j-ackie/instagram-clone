import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import bookmarkIcon from "../../icons/bookmark.svg";
import gearIcon from "../../icons/gear.svg";
import switchIcon from "../../icons/switch.svg";
import UserContext from "../../UserProvider";

export default function ProfilePicturePopup(props) {
    const userInfo = useContext(UserContext);

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/user/" + userInfo.username);
        props.setIsProfilePictureClicked(false);
    }

    const handleLogout = () => {
        localStorage.clear();
        props.setUserInfo({
            userId: "",
            username: "",
            profilePicture: ""
        });
        navigate("/login")
    };

    return (
        <div id="profile-picture-popup" className="popup">
            <ul>
                <li
                    onClick={ handleProfileClick }
                >
                    <img src={ DefaultProfilePicture } />Profile
                </li>
                <li><img src={ bookmarkIcon } />Saved</li>
                <li><img src={ gearIcon } />Settings</li>
                <li><img src={ switchIcon } />Switch accounts</li>
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
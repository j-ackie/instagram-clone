import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import bookmarkIcon from "../../icons/bookmark.svg";
import gearIcon from "../../icons/gear.svg";
import switchIcon from "../../icons/switch.svg";

export default function ProfilePicturePopup(props) {
    const handleLogout = () => {
        localStorage.clear();
        props.setUserInfo({
            userId: "",
            username: "",
            profilePicture: ""
        });
    };

    return (
        <div id="profile-picture-popup" className="popup">
            <ul>
                <li><img src={ DefaultProfilePicture } />Profile</li>
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
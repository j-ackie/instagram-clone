import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import bookmarkIcon from "../../icons/bookmark.svg";
import gearIcon from "../../icons/gear.svg";
import switchIcon from "../../icons/switch.svg";
import UserContext from "../../UserProvider";
import UserDataService from "../../services/UserDataService";
import { resetUserInfo } from "../../helpers";

export default function ProfilePicturePopup(props) {
    const [userInfo] = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        UserDataService.logout()
            .finally(() => {
                resetUserInfo(props.setUserInfo);
                navigate("/login");
            });
    };

    return (
        <div id="profile-picture-popup" className="navbar-pop-up">
            <ul onClick={ () => props.setIsProfilePictureClicked(false) }>
                <Link to={ `/user/${userInfo.username}` }>
                    <li>
                        <img alt="Profile" src={ defaultProfilePicture } />Profile
                    </li>
                </Link>
                <Link to={ `/user/${userInfo.username}` } state={ "saved" }>
                    <li>
                        <img alt="Saved" src={ bookmarkIcon } />Saved
                    </li>
                </Link>
                <Link to="/settings">
                    <li>
                        <img alt="Settings" src={ gearIcon } />Settings
                    </li>
                </Link>
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
import { useContext } from "react";
import UserContext from "../../UserProvider";
import { Link } from "react-router-dom";
import ProfilePicturePopup from "./ProfilePicturePopup";
import ActivityIconPopup from "./ActivityIconPopup";
import homeIcon from "../../icons/home.svg";
import plusIcon from "../../icons/plus.svg";
import filledPlusIcon from "../../icons/plus-fill.svg";
import chatIcon from "../../icons/chat.svg";
import heartIcon from "../../icons/heart.svg";
import filledHeartIcon from "../../icons/heart-fill.svg";
import instagramLogo from "../../icons/instagram_logo.png"
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import "./Navbar.css";

export default function Navbar(props) {
    const userInfo = useContext(UserContext);

    return (
        <nav>
            <div id="left-container">
                <Link
                    to="/"
                >
                    <img
                        src={ instagramLogo }
                    />
                </Link>
            </div>
            <div id="center-container">
                <input
                    placeholder="Search"
                />
            </div>
            <div id="right-container">
                <img
                    src={ homeIcon }
                />
                <img 
                    src={ chatIcon }
                />
                <img
                    src={
                        props.isPostIconClicked
                            ? filledPlusIcon
                            : plusIcon
                    }
                    onClick={ () => props.setIsPostIconClicked(true) }
                />
                <div 
                    id="navbar-activity-icon-container"
                >
                    <img
                        id="navbar-activity-icon"
                        src={
                            props.isActivityIconClicked
                                ? filledHeartIcon
                                : heartIcon
                        }
                        onClick={ () => props.setIsActivityIconClicked(true) }
                    />
                    {
                        props.isActivityIconClicked
                            ? <ActivityIconPopup

                              />
                            : ""
                    }
                </div>
                <div 
                    id="navbar-profile-picture-container"
                    className={
                        props.isProfilePictureClicked
                            ? "clicked"
                            : ""
                    }        
                >
                    <img
                        id="navbar-profile-picture"
                        src={ userInfo.profilePicture }
                        onClick={ () => props.setIsProfilePictureClicked(true) }
                    />
                    {
                        props.isProfilePictureClicked
                            ? <ProfilePicturePopup 
                                setUserInfo={ props.setUserInfo }
                              />
                            : ""
                    }
                </div>
            </div>
        </nav>
    )
}
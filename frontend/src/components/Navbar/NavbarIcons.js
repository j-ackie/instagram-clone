import { useContext, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Popup from "../Popup/Popup";
import LoginContainer from "../LoginRegisterPage/LoginContainer";
import UserContext from "../../UserProvider";
import CreatePost from "../CreatePost/CreatePost";
import ProfilePicturePopup from "./ProfilePicturePopup";
import ActivityIconPopup from "./ActivityIconPopup";
import homeIcon from "../../icons/home.svg";
import filledHomeIcon from "../../icons/home-fill.svg";
import plusIcon from "../../icons/plus.svg";
import filledPlusIcon from "../../icons/plus-fill.svg";
import chatIcon from "../../icons/chat.svg";
import heartIcon from "../../icons/heart.svg";
import filledHeartIcon from "../../icons/heart-fill.svg";
import defaultProfilePicture from "../../defaultProfilePicture.png";

export default function NavbarIcons(props) {
    const [isSwitchIconClicked, setIsSwitchIconClicked] = useState(false);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);

    const [userInfo, setUserInfo] = useContext(UserContext);
    const location = useLocation();

    return (
        <div id="right-container">
            <Link to="/">
                <img
                    alt="Home icon"
                    src={
                        location.pathname === "/"
                            ? filledHomeIcon
                            : homeIcon
                    }
                />
            </Link>
            <div id="navbar-create-post-container">
                <img
                    alt="Post icon"
                    src={
                        isPostIconClicked
                            ? filledPlusIcon
                            : plusIcon
                    }
                    onClick={ () => setIsPostIconClicked(true) }
                />
                <Popup 
                    variable={ isPostIconClicked }
                    setVariable={ setIsPostIconClicked }
                    content={
                        <CreatePost
                            setIsPostIconClicked={ setIsPostIconClicked }
                        />
                    }
                />
            </div>
            <div id="navbar-activity-icon-container">
                <img
                    alt="Activity icon"
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
                        ? <ActivityIconPopup />
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
                    alt="Profile icon"
                    id="navbar-profile-picture"
                    className={
                        location.pathname === "/user/" + userInfo.username
                            ? "clicked profile-picture"
                            : "profile-picture"
                        
                    }
                    src={
                        userInfo.profilePicture === ""
                            ? defaultProfilePicture
                            : userInfo.profilePicture
                    }
                    onClick={ () => props.setIsProfilePictureClicked(true) }
                />
                {
                    props.isProfilePictureClicked
                        ? <ProfilePicturePopup
                            setIsSwitchIconClicked={ setIsSwitchIconClicked }
                            setIsProfilePictureClicked={ props.setIsProfilePictureClicked }
                            setUserInfo={ setUserInfo }
                            />
                        : ""
                }

            <Popup
                variable={ isSwitchIconClicked }
                setVariable={ setIsSwitchIconClicked }
                content={
                    <LoginContainer />
                }
            />
            </div>
        </div>
    )
}
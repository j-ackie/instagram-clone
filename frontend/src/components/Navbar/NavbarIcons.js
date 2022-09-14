import { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";

export default function NavbarIcons(props) {
    const [isSwitchIconClicked, setIsSwitchIconClicked] = useState(false);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);
    const [isProfilePictureClicked, setIsProfilePictureClicked] = useState(false);
    const [isActivityIconClicked, setIsActivityIconClicked] = useState(false);

    const [userInfo, setUserInfo] = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.event) {
            return;
        }
        if (isProfilePictureClicked && props.event.target.parentElement.parentElement.id !== "profile-picture-popup") {
            setIsProfilePictureClicked(false);
        }
        if (isActivityIconClicked && props.event.target.parentElement.parentElement.id !== "activity-icon-popup") {
            setIsActivityIconClicked(false);
        }
        if (props.event.target.id === "navbar-profile-picture" && !isProfilePictureClicked) {
            setIsProfilePictureClicked(true);
        }
        else if (props.event.target.id === "navbar-activity-icon" && !isActivityIconClicked) {
            setIsActivityIconClicked(true);
        }
    }, [props.event]);

    return (
        <div id="right-container">
            <img
                src={
                    location.pathname === "/"
                        ? filledHomeIcon
                        : homeIcon
                }
                onClick={ () => navigate("/") }
            />
            <img 
                src={ chatIcon }
            />
            <div id="navbar-create-post-container">
                <img
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
                            posts={ props.posts }
                            setPosts={ props.setPosts }
                            setIsPostIconClicked={ setIsPostIconClicked }
                            isProfile={ location.pathname === "/user/" + userInfo.username }
                        />
                    }
                />
            </div>
            <div id="navbar-activity-icon-container">
                <img
                    id="navbar-activity-icon"
                    src={
                        isActivityIconClicked
                            ? filledHeartIcon
                            : heartIcon
                    }
                />
                {
                    isActivityIconClicked
                        ? <ActivityIconPopup

                            />
                        : ""
                }
            </div>
            <div 
                id="navbar-profile-picture-container"
                className={
                    isProfilePictureClicked
                        ? "clicked"
                        : ""
                }        
            >
                <img
                    id="navbar-profile-picture"
                    className={
                        location.pathname === "/user/" + userInfo.username
                            ? "clicked profile-picture"
                            : "profile-picture"
                        
                    }
                    src={
                        userInfo.profilePicture === ""
                            ? DefaultProfilePicture
                            : userInfo.profilePicture
                    }
                />
                {
                    isProfilePictureClicked
                        ? <ProfilePicturePopup
                            setIsSwitchIconClicked={ setIsSwitchIconClicked }
                            setIsProfilePictureClicked={ setIsProfilePictureClicked }
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
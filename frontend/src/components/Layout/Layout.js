import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout(props) {
    const [isProfilePictureClicked, setIsProfilePictureClicked] = useState(false);
    const [isActivityIconClicked, setIsActivityIconClicked] = useState(false);
    
    const handleClick = event => {
        if (isProfilePictureClicked && event.target.parentElement.parentElement.id !== "profile-picture-popup") {
            setIsProfilePictureClicked(false);
        }
        if (isActivityIconClicked && event.target.parentElement.parentElement.id !== "activity-icon-popup") {
            setIsActivityIconClicked(false);
        }
        if (event.target.id === "navbar-profile-picture" && !isProfilePictureClicked) {
            setIsProfilePictureClicked(true);
        }
        else if (event.target.id === "navbar-activity-icon" && !isActivityIconClicked) {
            setIsActivityIconClicked(true);
        }
    }

    return (
        <div onClick={ handleClick }>
            <Navbar
                isActivityIconClicked={ isActivityIconClicked }
                setIsActivityIconClicked={ setIsActivityIconClicked }
                isProfilePictureClicked={ isProfilePictureClicked }
                setIsProfilePictureClicked={ setIsProfilePictureClicked }
            />
            <Outlet />
        </div>
    )
}
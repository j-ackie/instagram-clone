import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout(props) {
    const [isProfilePictureClicked, setIsProfilePictureClicked] = useState(false);
    const [isActivityIconClicked, setIsActivityIconClicked] = useState(false);

    const location = useLocation();

    const handleClick = event => {
        if (isProfilePictureClicked && event.target.parentElement.parentElement.id !== "profile-picture-popup") {
            setIsProfilePictureClicked(false);
            return;
        }

        const element = document.getElementById("activity-icon-popup");
        if (isActivityIconClicked && !element.contains(event.target)) {
            setIsActivityIconClicked(false);
            return;
        }

        if (event.target.id === "navbar-profile-picture" && !isProfilePictureClicked) {
            setIsProfilePictureClicked(true);
        }
        else if (event.target.id === "navbar-activity-icon" && !isActivityIconClicked) {
            setIsActivityIconClicked(true);
        }
    }

    useEffect(() => {
        setIsActivityIconClicked(false);
        setIsProfilePictureClicked(false);
    }, [location.pathname]);

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
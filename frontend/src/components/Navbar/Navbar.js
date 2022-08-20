import { Link } from "react-router-dom";
import postIcon from "../../icons/add.png"
import instagramLogo from "../../icons/instagram_logo.png"
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import "./Navbar.css";

import Login from "../Login/Login"

export default function Navbar(props) {
    const handlePostIconClick = () => {
        props.setIsPostIconClicked(true);
    } 

    const handleProfilePictureClick = () => {

    }

    return (
        <nav>
            <Link
                to="/"
            >
                <img
                    src={ instagramLogo }
                />
            </Link>
            <input
                placeholder="Search"
            />
            <img 
                className="navbar-icons"
                src={ postIcon }
                onClick={ handlePostIconClick }
            />
            <img
                className="navbar-icons"
                id="navbar-profile-picture"
                src={ 
                    props.userInfo.profile_picture === ""
                        ? DefaultProfilePicture
                        : props.userInfo.profile_picture 
                }
                onClick={ handleProfilePictureClick }
            />
        </nav>
    )
}
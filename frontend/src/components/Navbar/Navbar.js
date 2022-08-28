import { useContext } from "react";
import UserContext from "../../UserProvider";
import { Link } from "react-router-dom";
import postIcon from "../../icons/add.png"
import instagramLogo from "../../icons/instagram_logo.png"
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import "./Navbar.css";

export default function Navbar(props) {
    const userInfo = useContext(UserContext);

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
                    userInfo.profilePicture === ""
                        ? DefaultProfilePicture
                        : userInfo.profilePicture 
                }
                onClick={ handleProfilePictureClick }
            />
        </nav>
    )
}
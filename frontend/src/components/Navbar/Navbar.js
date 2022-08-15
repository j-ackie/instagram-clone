import { Link } from "react-router-dom";
import postIcon from "../../icons/add.png"
import instagramLogo from "../../icons/instagram_logo.png"
import "./Navbar.css";

import Login from "../Login/Login"

export default function Navbar(props) {
    const handlePostIconClick = () => {
        props.setIsPostIconClicked(true);
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
            <Login 
                setUserInfo={ props.setUserInfo }
            />
            <h1>
                { props.userInfo.username }
            </h1>
            <img 
                className="navbar-icons"
                src={ postIcon }
                onClick={ handlePostIconClick }
            />
        </nav>
    )
}
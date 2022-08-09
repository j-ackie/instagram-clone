import postIcon from "../../icons/add.png"
import "./Navbar.css";

import Login from "../Login/Login"

export default function Navbar(props) {
    const handlePostIconClick = () => {
        props.setIsPostIconClicked(true);
    } 

    return (
        <nav>
            <h1>Instagram</h1>
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
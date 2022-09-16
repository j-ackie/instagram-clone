import { Link } from "react-router-dom";
import NavbarUser from "./NavbarUser";
import defaultProfilePicture from "../../defaultProfilePicture.png";

export default function SearchPopup(props) {
    const handleClick = () => {
        props.setIsSearchClicked(false);
        props.searchRef.current.blur();
    }

    let suggestedUsersList = [];
    for (const user of props.suggestedUsers) {
        if (user.profilePicture === "") {
            user.profilePicture = defaultProfilePicture;
        }
        suggestedUsersList.push(
            <Link 
                key={ user.username }
                to={ "/user/" + user.username } 
                onClick={ handleClick }
            >
                <NavbarUser
                    username={ user.username }
                    profilePicture={ user.profilePicture }
                />
            </Link>
        )
    }

    return (
        <div id="search-popup" className="navbar-pop-up" onMouseDown={ props.onMouseDown }>
            {
                suggestedUsersList
            }
        </div>
    )
}
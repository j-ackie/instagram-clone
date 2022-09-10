import { Link } from "react-router-dom";
import PostUser from "../Post/PostUser";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";

export default function SearchPopup(props) {
    const handleClick = () => {
        props.setIsSearchClicked(false);
        props.searchRef.current.blur();
    }

    let suggestedUsersList = [];
    for (const user of props.suggestedUsers) {
        if (user.profilePicture === "") {
            user.profilePicture = DefaultProfilePicture;
        }
        suggestedUsersList.push(
            <Link 
                key={ user.username }
                to={ "/user/" + user.username } 
                onClick={ handleClick }
            >
                <PostUser
                    suggestedUser={ true }
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
import { Link } from "react-router-dom";

export default function PostUser(props) {
    return (
        <span className="post-user">
            <Link to={ `/user/${props.username}` }>
                <img 
                    alt="Profile" 
                    className="post-profile-photo profile-picture"
                    src={ props.profilePicture }
                />
            </Link>
            <Link 
                onClick={ props.handleUserClick }
                className="post-username" 
                to={ "/user/" + props.username }
            >
                { props.username }
            </Link>
        </span>
    )
}
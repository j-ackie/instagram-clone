import { Link } from "react-router-dom";

export default function PostUser(props) {
    return (
        <span className="post-user">
            <img 
                alt="Profile" 
                className="post-profile-photo profile-picture"
                src={ props.profilePicture }
            />
            {
                !props.suggestedUser
                    ? <Link 
                        onClick={ props.handleUserClick }
                        className="post-username" 
                        to={ "/user/" + props.username }
                      >
                        { props.username }
                      </Link>
                    : <span className="post-username">{ props.username }</span>
            }
        </span>
    )
}
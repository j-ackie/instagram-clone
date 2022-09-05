import { Link } from "react-router-dom";

export default function PostUser(props) {
    return (
        <span className="post-user">
            <img alt="Profile" className="post-profile-photo"
                src={ props.profilePicture }
            />
            {
                !props.suggestedUser
                    ? <Link className="post-username" to={ "/user/" + props.username }>{ props.username }</Link>
                    : <span className="post-username">{props.username}</span>
            }
        </span>
    )
}
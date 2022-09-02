import { Link } from "react-router-dom";

export default function PostUser(props) {
    return (
        <span>
            <img className="post-profile-photo"
                src={ props.profilePicture }
            />
            <Link to={ "/user/" + props.username }>{ props.username }</Link>
        </span>
    )
}
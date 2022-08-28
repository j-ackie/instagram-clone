import { Link } from "react-router-dom";

export default function PostUser(props) {
    return (
        <span>
            <img className="post-profile-photo"
                src={ props.profilePicture }
            />
            <Link to="/a">{ props.username }</Link>
        </span>
    )
}
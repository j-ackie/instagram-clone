import { Link } from "react-router-dom";
import renderTimestamp from "../../helpers";

export default function PostCaption(props) {
    return (
        <div className="post-comment">
            <span className="post-comment-profile-picture">
                <img 
                    alt="Profile" 
                    className="post-profile-photo profile-picture"
                    src={ props.profilePicture }
                />
            </span>
            <span className="post-comment-content-container">
                <span>
                    <Link
                        className="post-username" 
                        to={ "/user/" + props.username }
                    >
                        { props.username }
                    </Link>
                    <p>
                        { props.caption }
                    </p>
                    <div className="timestamp">
                        { renderTimestamp(props.date) }
                    </div>
                </span>
            </span>
        </div>
    )
}
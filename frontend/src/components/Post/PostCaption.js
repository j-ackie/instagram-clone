import { Link } from "react-router-dom";
import Text from "../Text/Text";
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
                    <Text
                        content={ props.caption }
                    />
                    <div className="timestamp">
                        { renderTimestamp(props.date) }
                    </div>
                </span>
            </span>
        </div>
    )
}
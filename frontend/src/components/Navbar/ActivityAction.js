import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import UserDataService from "../../services/UserDataService";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import renderTimestamp from "../../helpers";

export default function ActivityAction(props) {
    const [actionUserInfo, setActionUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });
    const [post, setPost] = useState(null);

    const navigate = useNavigate();

    const handleClick = () => {
        if (props.action.postId) {
            navigate(`/post/${props.action.postId}`);
        }
        else {
            navigate(`/user/${actionUserInfo.username}`);
        }
    };

    useEffect(() => {
        let id;
        if (props.action.action === "follow") {
            id = props.action.followerId;
        }
        else {
            id = props.action.userId;
        }

        UserDataService.getUserById(id)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = defaultProfilePicture;
                }
                setActionUserInfo(response.data);
            });
        
        
        if (props.action.postId) {
            PostDataService.getPostById(props.action.postId)
                .then(response => {
                    setPost(response.data);
                });
        }
    }, [props.action.action, props.action.followerId, props.action.postId, props.action.userId]);

    let message;
    if (props.action.action === "follow") {
        message = "started following you.";
    }
    else if (props.action.action === "comment") {
        message = "commented on your post.";
    }
    else {
        message = "liked your post.";
    }

    return (
        <div className="activity-action">
            <Link to={ `/user/${actionUserInfo.username}` }>
                <img
                    alt="Profile"
                    src={ actionUserInfo.profilePicture }
                />
            </Link>
            <span className="activity-message">
                <Link to={ `/user/${actionUserInfo.username}` }>
                    <strong>{ actionUserInfo.username } </strong>
                </Link>
                <span className="activity-message-content" onClick={ handleClick }>
                    { message }
                    <span className="timestamp">
                        &nbsp; { renderTimestamp(props.action.date) }
                    </span>
                </span>
            </span>
            <span className="activity-post">
                {
                    post 
                        ? <Link to={ `/post/${props.action.postId}` }>
                            <img
                                alt="Preview" 
                                src={ post.files[0] }
                            />
                          </Link>
                        : ""
                }
            </span>
        </div>
    )
}
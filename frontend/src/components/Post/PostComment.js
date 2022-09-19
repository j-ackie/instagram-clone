import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";
import UserDataService from "../../services/UserDataService";
import UserContext from "../../UserProvider";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import renderTimestamp from "../../helpers";

export default function PostComment(props) {
    const [commentUserInfo, setCommentUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });

    const [userInfo] = useContext(UserContext);
    
    useEffect(() => {
        if (props.isUserComment) {
            setCommentUserInfo(userInfo);
            return;
        }
        UserDataService.getUserById(props.comment.userId)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = defaultProfilePicture;
                }
                setCommentUserInfo(response.data);
            });
    }, [userInfo, props.comment.userId, props.isUserComment]);

    return (
        <div className="post-comment">
            <span className="post-comment-profile-picture">
                <Link to={ `/user/${commentUserInfo.username}` }>
                    <img 
                        alt="Profile" 
                        className="post-profile-photo profile-picture"
                        src={ commentUserInfo.profilePicture }
                    />
                </Link>
            </span>
            <span className="post-comment-content-container">
                <span>
                    <Link
                        className="post-username" 
                        to={ "/user/" + commentUserInfo.username }
                    >
                        { commentUserInfo.username }
                    </Link>
                    <Text
                        content={ props.comment.comment }
                    />
                    <div className="timestamp">
                        { renderTimestamp(props.comment.date) }
                    </div>
                </span>
            </span>
        </div>
    )
}
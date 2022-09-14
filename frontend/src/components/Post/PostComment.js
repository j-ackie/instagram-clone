import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PostUser from "./PostUser";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import { renderTimestamp } from "../../helpers";

export default function PostComment(props) {
    const [commentUserInfo, setCommentUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });

    const [userInfo, setUserInfo] = useContext(UserContext);
    
    useEffect(() => {
        if (props.isUserComment) {
            setCommentUserInfo(userInfo);
            return;
        }
        PostDataService.getUserById(props.comment.userId)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = DefaultProfilePicture;
                }
                setCommentUserInfo(response.data);
            });
    }, []);

    return (
        <div className="post-comment">
            <span className="post-comment-profile-picture">
                <img 
                    alt="Profile" 
                    className="post-profile-photo profile-picture"
                    src={ commentUserInfo.profilePicture }
                />
            </span>
            <span className="post-comment-content-container">
                <span>
                    <Link
                        className="post-username" 
                        to={ "/user/" + commentUserInfo.username }
                    >
                        { commentUserInfo.username }
                    </Link>
                    <p>
                        { props.comment.comment }
                    </p>
                    <div className="timestamp">
                        { renderTimestamp(props.comment.date) }
                    </div>
                </span>
            </span>
        </div>
    )
}
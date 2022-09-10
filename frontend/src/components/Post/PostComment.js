import { useState, useEffect, useContext } from "react";
import PostUser from "./PostUser";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";

export default function PostComment(props) {
    const [commentUserInfo, setCommentUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
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
            <PostUser
                profilePicture={ commentUserInfo.profilePicture }
                username={ commentUserInfo.username }
            />
            <span className="post-comment-content">
                { props.comment.comment }
            </span>
        </div>
    )
}
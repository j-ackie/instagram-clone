import { useState, useEffect, useContext } from "react";
import PostUser from "./PostUser";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";

export default function PostComment(props) {
    const [commentUserInfo, setCommentUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });

    const userInfo = useContext(UserContext);
    
    useEffect(() => {
        if (props.isUserComment) {
            setCommentUserInfo(userInfo);
            return;
        }
        PostDataService.getUserById(props.comment.userId)
            .then(response => {
                setCommentUserInfo(response.data);
            });
    }, []);

    return (
        <div className="post-comment">
            <PostUser
                profilePicture={ commentUserInfo.profilePicture }
                username={ commentUserInfo.username }
            />
            { props.comment.comment }
        </div>
    )
}
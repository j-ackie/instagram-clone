import { useState, useEffect } from "react";
import PostUser from "./PostUser";
import PostDataService from "../../services/PostDataService";

export default function PostComment(props) {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });
    useEffect(() => {
        PostDataService.getUserById(props.comment.user_id)
            .then(response => {
                setUserInfo(response.data);
                console.log(response);
            })
    }, []);
    console.log(props.comment);
    return (
        <div className="post-comment">
            <PostUser
                profilePicture={ userInfo.profilePicture }
                username={ userInfo.username }
            />
            { props.comment.comment }
        </div>
    )
}
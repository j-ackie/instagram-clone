import PostDataService from "../../services/PostDataService";
import "./Post.css"
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostAddComment from "./PostAddComment";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png"
import { useState, useEffect, createRef } from "react";

export default function Post(props) {
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [comments, setComments] = useState([]);

    const commentRef = createRef();

    useEffect(() => {
        PostDataService.getUserById(props.postInfo.userId)
            .then(response => {
                console.log(response);
                if (response.data.profilePicture) {
                    setProfilePicture(response.data.profilePicture);
                }
                else {
                    setProfilePicture(DefaultProfilePicture);
                }
                setUsername(response.data.username);
            });
    }, [props.postInfo.userId]);

    return (
        <div className="post">
            <PostHeader
                username={ username }
                profilePicture={ profilePicture }
                postInfo={ props.postInfo }
                isExtendedPost={ false }
            />
            <img className="post-photo"
                alt="Post"
                src={ props.postInfo.file }
            />
            <PostFooter
                isExtendedPost={ false }
                username={ username }
                postInfo={ props.postInfo }
                comments={ comments }
                setComments={ setComments }
            />
            <PostAddComment
                ref={ commentRef }
                postId={ props.postInfo._id }
                comments={ comments }
                setComments={ setComments }
            />
        </div>
    )
}
import UserDataService from "../../services/UserDataService";
import "./Post.css"
import PostHeader from "./PostHeader";
import PostPhoto from "./PostPhoto";
import PostFooter from "./PostFooter";
import PostAddComment from "./PostAddComment";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import { useState, useEffect, createRef } from "react";

export default function Post(props) {
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [comments, setComments] = useState([]);
    const [currImageIndex, setCurrImageIndex] = useState(0);

    const commentRef = createRef();
    
    useEffect(() => {
        UserDataService.getUserById(props.postInfo.userId)
            .then(response => {
                if (response.data.profilePicture) {
                    setProfilePicture(response.data.profilePicture);
                }
                else {
                    setProfilePicture(defaultProfilePicture);
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
            <PostPhoto
                width={ 400 }
                files={ props.postInfo.files }
                currImageIndex={ currImageIndex }
                setCurrImageIndex={ setCurrImageIndex }
            />
            <PostFooter
                isExtendedPost={ false }
                username={ username }
                postInfo={ props.postInfo }
                comments={ comments }
                setComments={ setComments }
                currImageIndex={ currImageIndex }
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
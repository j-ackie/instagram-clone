import PostDataService from "../../services/PostDataService";
import "./Post.css"
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import PostAddComment from "./PostAddComment";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png"
import { useState, useEffect, useRef, createRef } from "react";

export default function Post(props) {
    const [username, setUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [comments, setComments] = useState([]);

    const commentRef = createRef();

    // const handleComment = () => {
    //     if (currComment !== "") { 
    //         props.handleComment(props.postInfo._id, currComment)
    //             .then(() => {
    //                 let newComments = [...comments];
    //                 newComments.push(currComment);
    //                 setComments(newComments);
    //                 setCurrComment("");
    //             });
    //     }
    // }

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
    }, []);

    return (
        <div className="post">
            <PostHeader
                username={ username }
                profilePicture={ profilePicture }
                postInfo={ props.postInfo }
            />
            <img className="post-photo"
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
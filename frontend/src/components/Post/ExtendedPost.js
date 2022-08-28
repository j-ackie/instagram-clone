import { useState, useEffect, useRef, createRef } from "react";
import { useParams } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import PostHeader from "./PostHeader";
import PostCommentSection from "./PostCommentSection";
import PostFooter from "./PostFooter";
import PostAddComment from "./PostAddComment";
import loadPost from "../../helpers";
import "./ExtendedPost.css";
import "./Post.css"

export default function ExtendedPost(props) {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState({
        postId: postId,
        userId: "",
        caption: "",
        file: "",
        date: "",
        likes: []
    });
    const [profilePicture, setProfilePicture] = useState("");
    const [username, setUsername] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const [comments, setComments] = useState([]);

    const commentRef = createRef();

    const handleLike = async(postId, numLikes, setNumLikes) => {
        let data = {
            post_id: postInfo.postId,
            user_id: props.userInfo.userId
        }
        PostDataService.likePost(data)
            .then(response => {
                if (response.data.status === "success") {
                    setNumLikes(numLikes + 1);
                }
            });
    }

    useEffect(() => {
        PostDataService.getPostById(postId)
            .then(response => {
                setPostInfo(response.data);
                setNumLikes(response.data.likes.length); // TODO: Remove this later
                setIsLiked(response.data.likes.includes(props.userInfo.userId));
                loadPost(response.data, setProfilePicture, setUsername, setComments);
            });
    }, []);
    
    return (
        <div className="extended-post-container">
            <div className="extended-post">
                <div className="extended-post-image-container">
                    <img 
                        src={ postInfo.file } 
                        className="extended-post-image"
                    />
                </div>
                <div className="extended-post-info">
                    <PostHeader
                        // handleOptionsClick={}
                        profilePicture={ profilePicture }
                        username={ username }
                    />
                    <PostCommentSection
                        postId={ postId }
                    />
                    <PostFooter
                        commentRef={ commentRef }
                        isExtendedPost={ true }
                        isLiked={ isLiked }
                        handleLike={ handleLike }
                        numLikes={ numLikes }
                        username={ username }
                        postInfo={ postInfo }
                        comments={ comments }
                        isExtendedPost={ true }
                    />
                    <PostAddComment
                        ref={ commentRef }
                    />
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect, useRef, createRef } from "react";
import { useParams } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import PostHeader from "./PostHeader";
import PostCommentSection from "./PostCommentSection";
import PostFooter from "./PostFooter";
import PostAddComment from "./PostAddComment";
import loadPost from "../../helpers";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import "./ExtendedPost.css";
import "./Post.css"

export default function ExtendedPost(props) {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState({
        postId: postId,
        userId: "",
        caption: "",
        file: "",
        date: ""
    });
    const [profilePicture, setProfilePicture] = useState("");
    const [username, setUsername] = useState("");
    const [comments, setComments] = useState([]);

    const commentRef = createRef();

    useEffect(() => {
        PostDataService.getPostById(postId)
            .then(response => {
                console.log(response.data)
                setPostInfo(response.data);

                PostDataService.getUserById(response.data.userId)
                    .then(response => {
                        if (response.data.profilePicture) {
                            setProfilePicture(response.data.profilePicture);
                        }
                        else {
                            setProfilePicture(DefaultProfilePicture);
                        }
                        setUsername(response.data.username);
                    });
            });
    }, []);

    useEffect(() => {
        console.log(comments);
    }, [comments])
    
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
                        profilePicture={ profilePicture }
                        username={ username }
                        postInfo={ postInfo }
                    />
                    <PostCommentSection
                        postId={ postId }
                        comments={ comments }
                        setComments={ setComments }
                    />
                    <PostFooter
                        commentRef={ commentRef }
                        isExtendedPost={ true }
                        username={ username }
                        postInfo={ postInfo }
                        comments={ comments }
                        setComments={ setComments }
                    />
                    <PostAddComment
                        ref={ commentRef }
                        postId={ postId }
                        comments={ comments }
                        setComments={ setComments }
                    />
                </div>
            </div>
        </div>
    )
}
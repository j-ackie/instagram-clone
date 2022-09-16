import { useState, useEffect, createRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import UserDataService from "../../services/UserDataService";
import PostPhoto from "./PostPhoto";
import PostHeader from "./PostHeader";
import PostCommentSection from "./PostCommentSection";
import PostFooter from "./PostFooter";
import PostAddComment from "./PostAddComment";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import "./ExtendedPost.css";
import "./Post.css"

export default function ExtendedPost(props) {
    const { postId } = useParams();
    const [postInfo, setPostInfo] = useState({
        postId: postId,
        userId: "",
        caption: "",
        files: [],
        date: ""
    });
    const [profilePicture, setProfilePicture] = useState("");
    const [username, setUsername] = useState("");
    const [comments, setComments] = useState([]);
    const [currImageIndex, setCurrImageIndex] = useState(0);

    const navigate = useNavigate();
    const commentRef = createRef();

    useEffect(() => {
        PostDataService.getPostById(postId)
            .then(response => {
                console.log(response.data)
                setPostInfo(response.data);

                UserDataService.getUserById(response.data.userId)
                    .then(response => {
                        if (response.data.profilePicture) {
                            setProfilePicture(response.data.profilePicture);
                        }
                        else {
                            setProfilePicture(defaultProfilePicture);
                        }
                        setUsername(response.data.username);
                    });
            })
            .catch(err => {
                navigate("/does-not-exist");
            });
    }, [navigate, postId]);

    return (
        <div className="extended-post-container">
            <div className="extended-post">
                <PostPhoto
                    showPageIndicator={ true }
                    width={ 500 }
                    files={ postInfo.files }
                    currImageIndex={ currImageIndex }
                    setCurrImageIndex={ setCurrImageIndex }
                />
                <div className="extended-post-info">
                    <PostHeader
                        profilePicture={ profilePicture }
                        username={ username }
                        postInfo={ postInfo }
                        isExtendedPost={ true }
                    />
                    <PostCommentSection
                        postId={ postId }
                        username={ username }
                        profilePicture={ profilePicture }
                        caption={ postInfo.caption }
                        date={ postInfo.date }
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
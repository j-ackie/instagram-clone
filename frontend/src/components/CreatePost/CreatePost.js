import { useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreatePostUpload from "./CreatePostUpload";
import CreatePostCrop from "./CreatePostCrop"
import CreatePostSubmit from "./CreatePostSubmit";
import CreatePostHeader from "./CreatePostHeader";
import "./CreatePost.css";
import Post from "../Post/Post";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";

export default function CreatePost(props) {
    const [file, setFile] = useState(null);
    const [isCropped, setIsCropped] = useState(false);

    const [userInfo, setUserInfo] = useContext(UserContext);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (event.target.id === "create-post") {
            props.setIsPostIconClicked(false);
        }
    }

    const handleShare = () => {
        let data = new FormData();
        data.append("userId", userInfo.userId);
        data.append("file", file);
        data.append("caption", inputRef.current.value);

        PostDataService.createPost(data)
            .then(response => {
                props.setIsPostIconClicked(false);
                PostDataService.getPostById(response.data.postId)
                    .then(response => {
                        if (props.isProfile) {
                            navigate(0);
                            return;
                        }
                        props.setPosts(
                            [
                                <Post
                                    key={ response.data.postId }
                                    postInfo={ response.data }
                                />,
                                ... props.posts
                            ]
                        );
                    });
            });
    }

    return (
        <div id={ !isCropped ? "create-post-popup" : "extended-create-post-popup" }>
            <CreatePostHeader 
                file={ file }
                isCropped={ isCropped }
                setFile={ setFile }
                setIsCropped={ setIsCropped }
                handleShare={ handleShare }
            />
            <div id="create-post-content">
                {   
                    !file ? <CreatePostUpload 
                                setFile={ setFile }
                            /> :
                !isCropped ? <CreatePostCrop
                                file={ file }
                                setFile={ setFile }
                                setIsCropped={ setIsCropped }
                            /> :
                            <CreatePostSubmit 
                                posts={ props.posts }
                                setPosts={ props.setPosts }
                                setIsPostIconClicked={ props.setIsPostIconClicked }
                                file={ file }
                                setFile={ setFile }
                                setIsCropped={ setIsCropped }
                                ref={ inputRef }
                            />
                }
            </div>
        </div>
    )
}
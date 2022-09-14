import { useContext, useState, useRef } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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

    const handleShare = () => {
        let data = new FormData();
        data.append("userId", userInfo.userId);
        data.append("file", file);
        data.append("caption", inputRef.current.value);
        data.append("date", new Date());

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
                                    key={ response.data._id }
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
                            /> :
                            <CreatePostSubmit 
                                file={ file }
                                ref={ inputRef }
                            />
                }
            </div>
        </div>
    )
}
import { useContext, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CreatePostUpload from "./CreatePostUpload";
import CreatePostCrop from "./CreatePostCrop"
import CreatePostSubmit from "./CreatePostSubmit";
import CreatePostHeader from "./CreatePostHeader";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";
import "./CreatePost.css";
import { handleError } from "../../helpers";

export default function CreatePost(props) {
    const [files, setFiles] = useState([]);
    const [isCropped, setIsCropped] = useState(false);
    const [currImageIndex, setCurrImageIndex] = useState(0);
    const [userInfo, setUserInfo] = useContext(UserContext);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleShare = () => {
        let data = new FormData();
        data.append("userId", userInfo.userId);
        data.append("caption", inputRef.current.value);
        data.append("date", new Date());

        for (const file of files) {
            data.append("file", file);
        };

        PostDataService.createPost(data)
            .then(response => {
                props.setIsPostIconClicked(false);
                PostDataService.getPostById(response.data.postId)
                    .then(response => {
                        if (pathname === `/user/${userInfo.username}` || pathname === `/`) {
                            navigate(0);
                        }
                    });
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            });
    };
    
    return (
        <div id={ !isCropped ? "create-post-popup" : "extended-create-post-popup" }>
            <CreatePostHeader 
                files={ files }
                isCropped={ isCropped }
                setFiles={ setFiles }
                setIsCropped={ setIsCropped }
                handleShare={ handleShare }
                setCurrImageIndex={ setCurrImageIndex }
            />
            <div id="create-post-content">
                {   
                    files.length === 0 ? <CreatePostUpload 
                                            setFiles={ setFiles }
                                          /> :
                             !isCropped ? <CreatePostCrop
                                            files={ files }
                                            setFiles={ setFiles }
                                            currImageIndex={ currImageIndex }
                                            setCurrImageIndex={ setCurrImageIndex }
                                          /> :
                                          <CreatePostSubmit 
                                            files={ files }
                                            ref={ inputRef }
                                            currImageIndex={ currImageIndex }
                                            setCurrImageIndex={ setCurrImageIndex }
                                          />
                }
            </div>
        </div>
    )
}
import { useState } from "react";
import CreatePostUpload from "./CreatePostUpload";
import CreatePostCrop from "./CreatePostCrop"
import CreatePostSubmit from "./CreatePostSubmit";
import CreatePostHeader from "./CreatePostHeader"
import "./CreatePost.css";

export default function CreatePost(props) {
    const [file, setFile] = useState(null);
    const [isCropped, setIsCropped] = useState(false);
    const [headers, setHeaders] = useState([]);

    const handleClick = (event) => {
        if (event.target.id === "create-post") {
            props.setIsPostIconClicked(false);
        }
    }

    return (
        <div id="create-post" onClick={ handleClick }>
            <div 
                id= {!isCropped 
                        ? "create-post-popup"
                        : "extended-create-post-popup"
                    }
                
                >
                <CreatePostHeader 
                    headers={ headers }
                />
                <div id="create-post-content">
                    {   
                        !file ? <CreatePostUpload 
                                    setFile={ setFile }
                                    setHeaders={ setHeaders }
                                /> :
                   !isCropped ? <CreatePostCrop
                                    file={ file }
                                    setFile={ setFile }
                                    setIsCropped={ setIsCropped }
                                    setHeaders={ setHeaders }
                                /> :
                                <CreatePostSubmit 
                                    userInfo={ props.userInfo }
                                    getAllPosts={ props.getAllPosts }
                                    setIsPostIconClicked={ props.setIsPostIconClicked }
                                    file={ file }
                                    setFile={ setFile }
                                    setIsCropped={ setIsCropped }
                                    setHeaders={ setHeaders }
                                />
                    }
                </div>
            </div>
        </div>
    )
}
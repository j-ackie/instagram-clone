import { useState } from "react";
import CreatePostUpload from "./CreatePostUpload";
import CreatePostSubmit from "./CreatePostSubmit"
import CreatePostHeader from "./CreatePostHeader"
import "./CreatePost.css";

export default function CreatePost(props) {
    const [file, setFile] = useState(null);
    const [headers, setHeaders] = useState([]);

    const handleClick = (event) => {
        if (event.target.id === "create-post") {
            props.setIsPostIconClicked(false);
        }
    }

    return (
        <div id="create-post" onClick={ handleClick }>
            <div id="create-post-popup">
                <CreatePostHeader 
                    headers={ headers }
                />
                <div id="create-post-content">
                {   file
                        ? <CreatePostSubmit
                            userInfo={ props.userInfo }
                            getAllPosts={ props.getAllPosts }
                            setIsPostIconClicked={ props.setIsPostIconClicked }
                            file={ file }
                            setFile={ setFile }
                            setHeaders={ setHeaders }
                          />
                        : <CreatePostUpload 
                            setFile={ setFile }
                            setHeaders={ setHeaders }
                          />
                }
                </div>
            </div>
        </div>
    )
}
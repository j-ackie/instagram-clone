import { useEffect, useRef } from "react";
import PostDataService from "../../services/PostDataService";

export default function CreatePostSubmit(props) {
    const inputRef = useRef(null);

    const handleClick = () => {
        let data = new FormData();
        data.append("user_id", props.userInfo.userId);
        data.append("file", props.file);
        data.append("caption", inputRef.current.value);

        PostDataService.createPost(data)
            .then(response => {
                props.setIsPostIconClicked(false);
                props.getAllPosts();
            });
    }

    useEffect(() => {
        let backButton = (
            <button 
                onClick={() => props.setIsCropped(false)}
            >
                Back
            </button>
        )
        let postButton = (
            <button
                onClick={ handleClick }
            >
                Post
            </button>
        )
        props.setHeaders([backButton, "Create new post", postButton]);
    }, []);

    return (
        <div id="create-post-submit">
            <div id="create-post-submit-preview">
                <img 
                    src={ URL.createObjectURL(props.file) }
                />
            </div>
            <div id="create-post-options">
                <span>
                    <img
                        src={ null }
                    />
                    <p>
                        { props.userInfo.username }
                    </p>
                </span>
                <div>
                    <input
                        ref={ inputRef }
                        placeholder="Write a caption..."
                    />
                </div>
            </div>
        </div>
    )
}
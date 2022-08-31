import { useEffect, useRef, useContext } from "react";
import UserContext from "../../UserProvider";
import PostDataService from "../../services/PostDataService";
import Post from "../Post/Post";

export default function CreatePostSubmit(props) {
    const userInfo = useContext(UserContext);

    const inputRef = useRef(null);

    const handleClick = () => {
        let data = new FormData();
        data.append("userId", userInfo.userId);
        data.append("file", props.file);
        data.append("caption", inputRef.current.value);

        PostDataService.createPost(data)
            .then(response => {
                console.log(response)
                props.setIsPostIconClicked(false);
                PostDataService.getPostById(response.data.postId)
                    .then(response => {
                        console.log(response)
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
                        { userInfo.username }
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
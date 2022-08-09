import { useEffect } from "react"
import PostDataService from "../../services/PostDataService";

function getBase64(file, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = callback;
    reader.onerror = () => {
        console.error("error");
    };
}

export default function CreatePostSubmit(props) {
    const handleClick = () => {
        getBase64(props.file, (event) => {
            let data = {
                file: event.target.result,
                user_id: props.userInfo.userId,
                date: new Date(),
                likes: [],
                comments: []
            };
            PostDataService.createPost(data)
                .then(response => {
                    props.setIsPostIconClicked(false);
                    props.getAllPosts();
                });
        });        
    }

    useEffect(() => {
        let backButton = (
            <button 
                onClick={() => props.setFile(null)}>
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
        props.setHeaders([backButton, "Crop", postButton]);
    }, []);

    return (
        <div id="create-post-submit">
            <img 
                id="create-post-preview"
                src={ URL.createObjectURL(props.file) }
            />
        </div>
    )
}
import { useEffect } from "react";
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
                user_id: props.userInfo.userId,
                file: event.target.result,
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
        <div>
            
        </div>
    )
}
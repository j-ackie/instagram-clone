import { useEffect } from "react"

export default function CreatePostSubmit(props) {
    useEffect(() => {
        let backButton = <button onClick={() => props.setFile(null)}>Back</button>
        let postButton = <button>Post</button>
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
import { useEffect } from "react"
import PostDataService from "../../services/PostDataService";

export default function CreatePostCrop(props) {
    useEffect(() => {
        let backButton = (
            <button 
                onClick={() => props.setFile(null)}
            >
                Back
            </button>
        )
        let nextButton = (
            <button
                onClick={() => {props.setIsCropped(true)}}
            >
                Next
            </button>
        )
        props.setHeaders([backButton, "Crop", nextButton]);
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
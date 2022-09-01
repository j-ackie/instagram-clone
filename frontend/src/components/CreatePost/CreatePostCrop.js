import { useEffect } from "react"
import PostDataService from "../../services/PostDataService";

export default function CreatePostCrop(props) {
    return (
        <div id="create-post-crop">
            <img 
                id="create-post-crop-preview"
                src={ URL.createObjectURL(props.file) }
            />
        </div>
    )
}
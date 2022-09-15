import { useState, useEffect, useRef } from "react"
import PostDataService from "../../services/PostDataService";
import CreatePostPreview from "./CreatePostPreview";


export default function CreatePostCrop(props) {
    return (
        <div id="create-post-crop">
            <CreatePostPreview
                files={ props.files }
            />
        </div>
    )
}
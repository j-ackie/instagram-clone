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
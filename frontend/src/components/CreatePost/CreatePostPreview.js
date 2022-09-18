import Arrows from "../Arrows/Arrows";
import PageIndicator from "../PageIndicator/PageIndicator";

export default function CreatePostPreview(props) {
    const preview = (
        <img
            alt="Preview"
            className="create-post-preview"
            src={ URL.createObjectURL(props.files[props.currImageIndex]) }
        />
    )

    return (
        <div className="create-post-preview-container">
            { preview }
            <PageIndicator
                length={ props.files.length }
                currImageIndex={ props.currImageIndex }
                setCurrImageIndex={ props.setCurrImageIndex }
            />
            <Arrows
                length={ props.files.length }
                currImageIndex={ props.currImageIndex }
                setCurrImageIndex={ props.setCurrImageIndex }
            />
        </div>
    )
}
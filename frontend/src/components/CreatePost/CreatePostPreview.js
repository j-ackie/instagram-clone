import { useState } from "react";
import Arrows from "../Arrows/Arrows";
import PageIndicator from "../PageIndicator/PageIndicator";
import dot from "../../icons/dot.svg";
import selectedDot from "../../icons/dot-selected.svg";

export default function CreatePostPreview(props) {
    const [currImageIndex, setCurrImageIndex] = useState(0);


    const preview = (
        <img
            alt="Preview"
            className="create-post-preview"
            src={ URL.createObjectURL(props.files[currImageIndex]) }
        />
    )

    let dotList = [];
    for (let i = 0; i < props.files.length; i++) {
        if (i === currImageIndex) {
            dotList.push(
                <img alt="Selected dot" key={ i } src={ selectedDot } />
            );
        }
        else {
            dotList.push(
                <img alt="Dot" key={ i } src={ dot } />
            );
        }
    }

    return (
        <div className="create-post-preview-container">
            { preview }
            <PageIndicator
                length={ props.files.length }
                currImageIndex={ currImageIndex }
                setCurrImageIndex={ setCurrImageIndex }
            />
            <Arrows
                length={ props.files.length }
                currImageIndex={ currImageIndex }
                setCurrImageIndex={ setCurrImageIndex }
            />
        </div>
    )
}
import CreatePostPreview from "./CreatePostPreview";
import CreatePostCollection from "./CreatePostCollection";
import collectionIcon from "../../icons/collection.svg";
import { useState } from "react";


export default function CreatePostCrop(props) {
    const [isCollectionClicked, setIsCollectionClicked] = useState(false);

    return (
        <div id="create-post-crop">
            <CreatePostPreview
                files={ props.files }
                currImageIndex={ props.currImageIndex }
                setCurrImageIndex={ props.setCurrImageIndex }
            />
            <div id="create-post-crop-edit">
                {
                    isCollectionClicked
                        ? <CreatePostCollection 
                            files={ props.files }
                            setFiles={ props.setFiles }
                            currImageIndex={ props.currImageIndex }
                            setCurrImageIndex={ props.setCurrImageIndex }
                          />
                        : ""
                }
                <div id="collection-container" onClick={ () => setIsCollectionClicked(!isCollectionClicked) }>
                    <img alt="Collection" src={ collectionIcon } />
                </div>
            </div>
        </div>
    )
}
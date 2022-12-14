import { useRef } from "react";
import { isFilesValid } from "../../helpers";

export default function CreatePostUpload(props) {
    const inputFile = useRef(null);

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (isFilesValid(event.dataTransfer.files)) {
            props.setFiles([...event.dataTransfer.files]);
        }
    }
    
    const handleSubmit = (event) => {
        if (isFilesValid(event.target.files)) {
            props.setFiles([...event.target.files]);
        }
    }

    return (
        <div
            id="create-post-upload"
            onDragEnter={ handleDrag }
            onDragLeave={ handleDrag }
            onDragOver={ handleDrag }
            onDrop={handleDrop}
        >
            <p>
                Drag photos and videos here
            </p>
            <input
                multiple
                type="file"
                accept="image/png, image/jpeg"
                ref={inputFile}
                onChange={handleSubmit}
            />
            <button
                className="submit"
                onClick={() => { inputFile.current.click() }}
            >
                Select from computer
            </button>

        </div>
    )
}
import { useEffect, useRef } from "react";

export default function CreatePostUpload(props) {
    const inputFile = useRef(null);

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files) {
            props.setFile(event.dataTransfer.files[0]);
        }
    }

    const handleSubmit = (event) => {
        console.log(event.target.files[0])
        props.setFile(event.target.files[0]);
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
                type="file"
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
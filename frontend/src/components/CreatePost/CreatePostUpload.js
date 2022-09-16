import { useRef } from "react";

export default function CreatePostUpload(props) {
    const inputFile = useRef(null);

    const handleDrag = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const isFilesValid = files => {
        const fileSizeLimit = 50 * 1024 * 1024; // 50 MB

        if (files.length > 10) {
            alert("maximum files is 10");
            return false;
        }

        for (const file of files) {
            if (file.type !== "image/jpeg" && file.type !== "image/png") {
                alert("incompatible file type");
                return false;
            }
            if (file.size > fileSizeLimit) {
                alert(`${file.name} is too large`);
                return false;
            }
        }

        return true;
    }

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (isFilesValid(event.dataTransfer.files)) {
            props.setFiles(event.dataTransfer.files);
        }
    }
    
    const handleSubmit = (event) => {
        if (isFilesValid(event.target.files)) {
            props.setFiles(event.target.files);
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
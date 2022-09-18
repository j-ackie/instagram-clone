import { useRef } from "react";
import { Reorder, AnimatePresence } from "framer-motion";
import CreatePostCollectionItem from "./CreatePostCollectionItem";
import plusIcon from "../../icons/plus-circle.svg";
import { isFilesValid } from "../../helpers";

export default function CreatePostCollection(props) {
    const inputRef = useRef(null);

    const handleSubmit = event => {
        if (isFilesValid(event.target.files)) {
            props.setFiles([
                ...props.files,
                ...event.target.files
            ]);
        }
    }

    const handleClick = event => {
        props.setCurrImageIndex(parseInt(event.target.getAttribute("index")));
    }

    const handleReorder = (arr) => {
        props.setFiles(arr)
    }

    return (
        <div id="create-post-collection">
            <Reorder.Group
                axis="x"
                values={ props.files }
                onReorder={ handleReorder }
            >
                <AnimatePresence initial={false}>
                    { props.files.map((file, index) => {
                        return <CreatePostCollectionItem
                            key={ file.filename }
                            file={ file }
                            index={ index }
                            handleClick={ handleClick }
                        />
                    }) }
                </AnimatePresence>
            </Reorder.Group>
            <img
                alt="Add post"
                id="plus-icon"
                onClick={ () => inputRef.current.click() }
                src={ plusIcon }
            />
            <input 
                multiple
                type="file"
                accept="image/png, image/jpeg"
                ref={ inputRef }
                onChange={ handleSubmit }
            />
        </div>
    )
}
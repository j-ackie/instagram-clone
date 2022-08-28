import { useState, useRef, forwardRef } from "react"

const PostAddComment = forwardRef((props, ref) => {
    const [currComment, setCurrComment] = useState("");

    const handleOnInput = (event) => {
        setCurrComment(event.target.textContent);
    }

    const handleOnKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            console.log("hey")
            event.preventDefault();
            handleComment();
        }
    }

    const handleComment = () => {
        if (currComment === "") {
            return;
        }
        
    }

    return (
        <div className="add-comment">
            <div>
                <div className="comment-container">
                    <div
                        ref={ ref }
                        className="comment"
                        onInput={ handleOnInput }
                        onKeyDown={ handleOnKeyDown }
                        contentEditable="true"
                    />
                </div>
                <button
                    onClick={ handleComment }
                    disabled={ currComment === "" }
                >
                    Post
                </button>
            </div>
        </div>
    )
})

export default PostAddComment;
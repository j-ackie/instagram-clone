import { useState, useRef, forwardRef, useContext, useEffect } from "react";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";
import PostComment from "./PostComment";

const PostAddComment = forwardRef((props, ref) => {
    const [currComment, setCurrComment] = useState("");
    
    const userInfo = useContext(UserContext);

    const handleOnInput = (event) => {
        setCurrComment(event.target.textContent);
    }

    const handleOnKeyDown = (event) => {
        if (event.keyCode === 13 && !event.shiftKey) {
            event.preventDefault();
            handleComment();
        }
    }

    const handleComment = () => {
        if (currComment === "") {
            return;
        }
        const data = {
            postId: props.postId,
            userId: userInfo.userId,
            comment: currComment
        }
        PostDataService.commentPost(data)
            .then(response => {
                setCurrComment("");
                ref.current.textContent = "";
                props.setComments(
                    [
                        <PostComment 
                            key={ response.data.insertedId } 
                            comment={ data } 
                            isUserComment={ true }    
                        />, 
                        ... props.comments
                    ]
                );
            });
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
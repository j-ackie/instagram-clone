import { useEffect, useState } from "react";
import PostComment from "./PostComment";
import PostDataService from "../../services/PostDataService";

export default function PostCommentSection(props) {
    useEffect(() => {
        PostDataService.getComments(props.postId)
            .then(response => {
                let commentsList = [];
                for (const comment of response.data.comments) {
                    commentsList.push(
                        <PostComment
                            key={ comment._id }
                            comment={ comment }
                        />
                    )
                }
                props.setComments(commentsList);
            });
    }, []);

    return (
        <div className="comment-section">
            { props.comments }
        </div>
    )
}
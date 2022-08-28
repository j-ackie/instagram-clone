import { useEffect, useState } from "react";
import PostComment from "./PostComment";
import PostDataService from "../../services/PostDataService";

export default function PostCommentSection(props) {
    const [comments, setComments] = useState([]);
    

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
                setComments(commentsList);
            });
    }, []);

    return (
        <div className="comment-section">
            { comments }
        </div>
    )
}
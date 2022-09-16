import { useEffect } from "react";
import PostCaption from "./PostCaption";
import PostComment from "./PostComment";
import PostDataService from "../../services/PostDataService";

export default function PostCommentSection(props) {
    const { postId, setComments } = props;

    useEffect(() => {
        PostDataService.getComments(postId)
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
    }, [postId, setComments]);

    return (
        <div className="comment-section">
            {
                props.caption !== ""
                    ? <PostCaption
                        username={ props.username }
                        profilePicture={ props.profilePicture }
                        caption={ props.caption }
                        date={ props.date }
                      />
                    : ""
            }
            { props.comments }
        </div>
    )
}
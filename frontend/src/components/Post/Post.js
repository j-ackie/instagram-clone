import PostDataService from "../../services/PostDataService";
import { Link } from "react-router-dom";
import "./Post.css"
import { useState, useEffect, useRef } from "react";

export default function Post(props) {
    const [username, setUsername] = useState("");
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [numLikes, setNumLikes] = useState(props.postInfo.likes.length);

    const commentRef = useRef("");

    const handleLike = () => {
        if (!isLiked) {
            props.handleLike(props.postInfo._id, numLikes, setNumLikes)
                .then(() => {
                    setIsLiked(true);
                });
        }
        else {

        }
    }

    const handleComment = () => {
        props.handleComment(props.postInfo._id, commentRef.current.value);
    }

    const renderTimestamp = (timestamp) => {
        timestamp = new Date(timestamp);
        const msInHour = 1000 * 60 * 60;
        const timePassed = new Date() - timestamp;
        let hoursPassed = timePassed / msInHour;
        
        if (hoursPassed < 1) {
            let minsPassed = Math.round(hoursPassed * 60);
            return minsPassed + " MINUTES AGO";
        }
        else if (hoursPassed >= 1 && hoursPassed <= 24) {
            hoursPassed = Math.round(hoursPassed);
            if (hoursPassed === 1) {
                return hoursPassed + " HOUR AGO";
            }
            return hoursPassed + " HOURS AGO";
        }
        else {
            let daysPassed = hoursPassed / 24;
            if (daysPassed <= 7) {
                daysPassed = Math.round(daysPassed);
                if (daysPassed === 1) {
                    return daysPassed + " DAY AGO";
                }
                return daysPassed + " DAYS AGO"
            }
            else {
                // TODO: Format string
                return timestamp.toDateString();
            }
        }
    }

    useEffect(() => {
        PostDataService.getUserById(props.postInfo.user_id)
            .then(response => {
                setUsername(response.data.username);
            });
    }, []);

    useEffect(() => {
        setIsLiked(props.isLiked);
    }, [props.isLiked]);

    return (
        <div className="post">
            <div className="header">
                <img className="post-profile-photo"
                    src={ props.profile_image_url }
                />
                <Link to="/a">{ username }</Link>

            </div>
            <img className="post-photo"
                src={ props.postInfo.file }
            />
            <div className="footer">
                <div className="icons">
                    <button
                        onClick={ handleLike }
                    >
                        Like { isLiked ? "hey" : "no" }
                    </button>
                    <button>Comment</button>
                    <button>Share</button>
                </div>
                <div className="likes">
                    <span>
                        <p>
                            Liked by { numLikes } others
                        </p>
                    </span>
                </div>
                <div className="description">
                    <Link to="/a">{ username }</Link>
                    <span>
                        <p>
                            { props.postInfo.caption }
                        </p>
                    </span>
                </div>
                <div className="view-comments">
                    {
                        props.postInfo.comments.length != 0
                            ? <span>
                                <p>
                                    View {
                                            props.postInfo.comments.length === 1
                                                ? "1 comment"
                                                : "all " + props.postInfo.comments.length + " comments"
                                         }
                                </p>
                              </span>
                            : ""
                    }
                </div>
                <div className="timestamp">
                    <span>
                        { renderTimestamp(props.postInfo.date) }
                    </span>
                </div>
            </div>
            <div className="add-comment">
                <div>
                    <input
                        ref={ commentRef }
                        placeholder="Add a comment..."
                    />
                    <button
                        onClick={ handleComment }
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
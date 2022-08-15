import PostDataService from "../../services/PostDataService";
import { Link } from "react-router-dom";
import "./Post.css"
import { useState, useEffect, useRef } from "react";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png"
import LikedIcon from "../Icons/LikedIcon";
import UnlikedIcon from "../Icons/UnlikedIcon";
import CommentIcon from "../Icons/CommentIcon"
import ShareIcon from "../Icons/ShareIcon";
import SaveIcon from "../Icons/SaveIcon";

export default function Post(props) {
    const [username, setUsername] = useState("");
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const [profilePicture, setProfilePicture] = useState(null);
    const [numLikes, setNumLikes] = useState(props.postInfo.likes.length);
    const [comments, setComments] = useState([]);
    const [currComment, setCurrComment] = useState("");

    const handleLike = () => {
        if (!isLiked) {
            props.handleLike(props.postInfo._id, numLikes, setNumLikes)
                .then(() => {
                    setIsLiked(true);
                });
        }
        else {
            // props.handleUnlike
        }
    }

    const handleComment = () => {
        props.handleComment(props.postInfo._id, currComment);
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
                console.log(response);
                if (response.data.profile_picture) {
                    setProfilePicture(response.data.profile_picture);
                }
                else {
                    setProfilePicture(DefaultProfilePicture);
                }
                setUsername(response.data.username);
            });
        PostDataService.getComments(props.postInfo._id)
            .then(response => {
                console.log(response.data);
                setComments(response.data.comments);
            });
    }, []);

    useEffect(() => {
        setIsLiked(props.isLiked);
    }, [props.isLiked]);


    return (
        <div className="post">
            <div className="header">
                <img className="post-profile-photo"
                    src={ profilePicture }
                />
                <Link to="/a">{ username }</Link>

            </div>
            <img className="post-photo"
                src={ props.postInfo.file }
            />
            <div className="footer">
                <div className="icons">
                    <span id="left-hand">
                        { isLiked
                            ? <LikedIcon onClick={ handleLike }/>
                            : <UnlikedIcon onClick={ handleLike }/> 
                        }
                        <CommentIcon onClick={ () => {} }/>
                        <ShareIcon onClick={ () => {} }/>
                    </span>
                    
                    <span id="right-hand">
                        <SaveIcon onClick={ () => {} } />
                    </span>
                    
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
                        comments.length != 0
                            ? <span onClick={ () => {console.log(comments)} }>
                                <p>
                                    View {
                                            comments.length === 1
                                                ? "1 comment"
                                                : "all " + comments.length + " comments"
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
                        value={ currComment }
                        onChange={ event => setCurrComment(event.target.value) }
                        placeholder="Add a comment..."
                    />
                    <button
                        onClick={ handleComment }
                        className={ currComment !== ""
                                        ? "enabled"
                                        : "disabled"
                                  }
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
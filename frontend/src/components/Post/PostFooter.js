import { useState, useEffect, useContext } from "react";
import UserContext from "../../UserProvider";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";
import PostLikesPopup from "./PostLikesPopup";
import PostDescription from "./PostDescription";
import LikedIcon from "../Icons/LikedIcon";
import UnlikedIcon from "../Icons/UnlikedIcon";
import CommentIcon from "../Icons/CommentIcon"
import ShareIcon from "../Icons/ShareIcon";
import SaveIcon from "../Icons/SaveIcon";
import saveIcon from "../../icons/bookmark.svg";
import filledSaveIcon from "../../icons/bookmark-fill.svg";
import { renderTimestamp } from "../../helpers";
import PostDataService from "../../services/PostDataService";

export default function PostFooter(props) {
    const [timestamp, setTimestamp] = useState("");
    const [likes, setLikes] = useState([]);
    const [numLikes, setNumLikes] = useState(0);
    const [numComments, setNumComments] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isLikesClicked, setIsLikesClicked] = useState(false);

    const [userInfo, setUserInfo] = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.postInfo._id) {
            return;
        }
        PostDataService.getLikesById(props.postInfo._id)
            .then(response => {
                setLikes(response.data.likes);
                setNumLikes(response.data.likes.length);
                for (const like of response.data.likes) {
                    if (like.userId === userInfo.userId) {
                        setIsLiked(true);
                        break;
                    }
                }
            });

        PostDataService.getComments(props.postInfo._id)
            .then(response => {
                setNumComments(response.data.comments.length);
            });

        PostDataService.getSaveByPostId(props.postInfo._id)
            .then(response => {
                setIsSaved(response.data.saves.length !== 0);
            });
        
    }, [props.postInfo, userInfo.userId]);

    useEffect(() => {
        setTimestamp(renderTimestamp(props.postInfo.date).toUpperCase());
    }, [props.postInfo.date]);

    const handleLike = () => {
        const data = {
            postId: props.postInfo._id
        };
        PostDataService.likePost(data)
            .then(response => {
                setIsLiked(true);
                setNumLikes(numLikes + 1);
            })
            .catch(err => {
                console.error(err);
            });
    }

    const handleUnlike = () => {
        PostDataService.unlikePost(props.postInfo._id)
            .then(response => {
                setIsLiked(false);
                setNumLikes(numLikes - 1);
            });
    }

    const handleCommentIconClick = () => {
        if (props.isExtendedPost) {
            props.commentRef.current.focus();
        }
        else {
            navigate("/post/" + props.postInfo._id);
        }
    }

    const handleSaveIconClick = () => {
        const data = {
            postId: props.postInfo._id
        };
        PostDataService.savePost(data)
            .then(response => {
                setIsSaved(true);
            })
    }

    return (
        <div className="footer">
            <div className="icons">
                <span id="left-hand">
                    { isLiked
                        ? <LikedIcon onClick={ handleUnlike }/>
                        : <UnlikedIcon onClick={ handleLike }/> 
                    }
                    <CommentIcon onClick={ handleCommentIconClick }/>
                    <ShareIcon onClick={ () => {} }/>
                </span>
                <span id="right-hand">
                    {
                        isSaved
                            ? <img src={ filledSaveIcon } onClick={ handleSaveIconClick }/>
                            : <img src={ saveIcon } onClick={ handleSaveIconClick } />
                    }
                    
                </span>
            </div>
            {
                numLikes !== 0
                    ? <div className="likes" onClick={ () => setIsLikesClicked(true) }>
                        <span>
                            <p>
                                Liked by { numLikes } others
                            </p>
                        </span>
                      </div>
                    : ""
            }
            { 
                !props.isExtendedPost && props.postInfo.caption !== ""
                    ? <PostDescription
                        username={ props.username }
                        caption={ props.postInfo.caption }
                      />
                    : ""
            }
            { 
                !props.isExtendedPost
                    ? <div className="view-comments">
                        {
                            numComments !== 0
                                ? <Link 
                                    to={ "/post/" + props.postInfo._id } 
                                    onClick={ props.handleViewComments }
                                  >
                                    <p>
                                        View {
                                                numComments === 1
                                                    ? "1 comment"
                                                    : "all " + numComments + " comments"
                                            }
                                    </p>
                                  </Link>
                                : ""
                        }
                      </div>
                    : ""
            }
            <div className="timestamp">
                <span>
                    { timestamp }
                </span>
            </div>
            <Popup 
                variable={ isLikesClicked }
                setVariable={ setIsLikesClicked }
                content={
                    <PostLikesPopup
                        likes={ likes }
                        setIsLikesClicked={ setIsLikesClicked }
                    />
                }
            />
        </div>
    )
}
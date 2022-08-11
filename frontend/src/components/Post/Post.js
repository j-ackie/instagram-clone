import PostDataService from "../../services/PostDataService";
import { Link } from "react-router-dom";
import "./Post.css"
import { useState, useEffect, useRef } from "react";

export default function Post(props) {
    const [username, setUsername] = useState("");
    // const [isLiked, setIsLiked] = useState(props.postInfo.likes.includes(props.userInfo.userId));
    const [numLikes, setNumLikes] = useState(props.postInfo.likes.length);

    useEffect(() => {
        PostDataService.getUserById(props.postInfo.user_id)
            .then(response => {
                setUsername(response.data.username);
            });
    }, []);

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
                        onClick={ () => props.handleLike(props.postInfo._id, numLikes, setNumLikes) }
                    >
                        Like
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
                {
                    props.postInfo.comments.length != 0
                        ? <span>
                            <p>
                              {  }
                            </p>
                          </span>
                        : <span>
                                
                          </span>
                }
            </div>
        </div>
    )
}
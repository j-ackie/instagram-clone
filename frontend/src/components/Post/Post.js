import PostDataService from "../../services/PostDataService";
import { Link } from "react-router-dom";
import "./Post.css"
import { useState, useEffect } from "react";

export default function Post(props) {

    const [username, setUsername] = useState("");

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
                    <button>Like</button>
                    <button>Comment</button>
                    <button>Share</button>
                </div>
                <div className="likes">
                    <span>
                        <p>
                            Liked by { props.postInfo.likes.length } others
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
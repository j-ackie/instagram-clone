import PostDataService from "../../services/PostDataService";
import { Link } from "react-router-dom";
import "./Post.css"
import { useState, useEffect } from "react";

export default function Post(props) {

    const [postInfo, setPostInfo] = useState({
        "_id": null,
        "user_id": null,
        "date": null,
        "likes": [],
        "comments": []
    });

    const [username, setUsername] = useState("");

    useEffect(() => {
        let info;
        PostDataService.getPostById(props.postId)
            .then(response => {
                info = response.data;
                setPostInfo(info);

            })
            .then(response => {
                PostDataService.getUserById(info.user_id)
                    .then(response => {
                        setUsername(response.data.username);
                    });
            })
    }, [])

    return (
        <div className="post">
            <div className="header">
                <img className="post-profile-photo"
                    src={ props.profile_image_url }
                />
                <Link to="/a">{ username }</Link>

            </div>
            <img className="post-photo"
                src={ props.image_url }
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
                            Liked by { postInfo.likes.length } others
                        </p>
                    </span>
                </div>
                <div className="description">
                    <Link to="/a">{ username }</Link>
                    <span>
                        <p>
                        While it may not be obvious to everyone, there are a number of reasons creating random paragraphs can be useful. A few examples of how some people use this generator are listed in the following paragraphs.
                        </p>
                    </span>
                </div>
            </div>
        </div>
    )
}
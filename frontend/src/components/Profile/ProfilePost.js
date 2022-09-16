import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import heartIcon from "../../icons/heart-fill-white.svg";
import chatIcon from "../../icons/chat-fill-white.svg";

export default function ProfilePost(props) {
    const [isHovering, setIsHovering] = useState(false);
    const [numLikes, setNumLikes] = useState(0);
    const [numComments, setNumComments] = useState(0);

    useEffect(() => {
        PostDataService.getLikesById(props.postInfo._id)
            .then(response => {
                setNumLikes(response.data.likes.length);
            });
        
        PostDataService.getComments(props.postInfo._id)
            .then(response => {
                setNumComments(response.data.comments.length);
            });
    }, [props.postInfo._id]);

    return (
        <div 
            className="profile-page-post"
            onMouseEnter={ () => setIsHovering(true) }
            onMouseLeave={ () => setIsHovering(false) }
        >   
            {
                isHovering
                    ? <div className="profile-page-post-hover">
                        <Link
                
                            to={ "/post/" + props.postInfo._id }
                        >
                         
                        <span className="num-likes">
                            <img alt="Likes" src={ heartIcon } />
                            &nbsp;
                            { numLikes }
                        </span>

                        <span className="num-comments">
                            <img alt="Comments" src={ chatIcon } />
                            &nbsp;
                            { numComments }
                        </span>
                           
                        </Link>
                      </div>
                    : ""
            }
            <img
                alt="Profile post"
                className={
                    isHovering
                        ? "darken"
                        : ""
                }
                src={ props.postInfo.files[0] }
            />
        </div>
    )
}
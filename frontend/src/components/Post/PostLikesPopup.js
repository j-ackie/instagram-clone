import ProfilePopupUser from "../Profile/ProfilePopupUser";
import PostDataService from "../../services/PostDataService";
import { useState, useEffect } from "react";

export default function PostLikesPopup(props) {
    const [likes, setLikes] = useState([]);

    useEffect(() => {
        PostDataService.getLikesById(props.postId)
            .then(response => {
                let likesList = [];
                for (const like of response.data.likes) {
                    likesList.push(
                        <ProfilePopupUser
                            key={ like.userId }
                            userId={ like.userId }
                        />
                    )
                }
                setLikes(likesList);
            });
    }, []);

    return (
        <div id="post-likes">
            <div className="popup-header">
                Likes
            </div>
            <div>
                { likes }
            </div>
        </div>
    )
}
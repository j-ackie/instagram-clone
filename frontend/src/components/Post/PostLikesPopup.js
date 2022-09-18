import ProfilePopupUser from "../Profile/ProfilePopupUser";
import PostDataService from "../../services/PostDataService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { handleError } from "../../helpers";
import UserContext from "../../UserProvider";

export default function PostLikesPopup(props) {
    const [likes, setLikes] = useState([]);
    const [, setUserInfo] = useContext(UserContext);

    const navigate = useNavigate();

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
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            })
    }, [navigate, props.postId, setUserInfo]);

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
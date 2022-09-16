import { useState, useEffect, useContext } from "react"
import UserContext from "../../UserProvider";
import { handleError } from "../../helpers";
import PostDataService from "../../services/PostDataService"
import ProfilePost from "./ProfilePost";
import { useNavigate } from "react-router-dom";

export default function ProfileSaves(props) {
    const [saves, setSaves] = useState([]);
    const [, setUserInfo] = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        PostDataService.getSaves()
            .then(response => {
                const postsList = response.data.saves.map(element => {
                    return PostDataService.getPostById(element.postId)
                });

                Promise.all(postsList)
                    .then(response => {
                        setSaves(response.map(element => {
                            return <ProfilePost
                                        key={ element.data._id }
                                        postInfo={ element.data }
                                   />
                        }));
                    });
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            });
    }, [navigate, setUserInfo]);

    return (
        <div className="profile-page-images">
            { saves }
            <div id="empty" />
        </div>
    )
}
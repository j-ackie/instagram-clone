import { useState, useEffect } from "react"
import PostDataService from "../../services/PostDataService"
import UserDataService from "../../services/UserDataService"
import defaultProfilePicture from "../../defaultProfilePicture.png";
import renderTimestamp from "../../helpers";

export default function ActivityFollow(props) {
    const [actionUserInfo, setActionUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });

    useEffect(() => {
        PostDataService.getUserById(props.action.userId)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = defaultProfilePicture;
                }
                setActionUserInfo(response.data);
            });
    }, []);
    
    return (
        <div className="activity-action">
            <img
                src={ actionUserInfo.profilePicture }
            />
            <span>
                <strong>{ actionUserInfo.username } </strong>
                started following you.
            </span>
            <span>
                &nbsp; { renderTimestamp(props.action.date) }
            </span>
        </div>
    )
}
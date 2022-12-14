import { useState, useEffect } from "react"
import UserDataService from "../../services/UserDataService";
import PostUser from "../Post/PostUser";
import defaultProfilePicture from "../../defaultProfilePicture.png";

export default function ProfilePopupUser(props) {
    const [followerUserInfo, setFollowerUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });

    useEffect(() => {
        UserDataService.getUserById(props.userId)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = defaultProfilePicture;
                }
                setFollowerUserInfo(response.data);
            })
    }, [props.userId]);

    return (
        <div className="profile-popup-user">
            <PostUser 
                username={ followerUserInfo.username }
                profilePicture={ followerUserInfo.profilePicture }
                handleUserClick={ props.handleUserClick }
            />
        </div>
    )
}
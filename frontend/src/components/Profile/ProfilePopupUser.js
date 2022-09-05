import { useState, useEffect } from "react"
import PostDataService from "../../services/PostDataService";
import PostUser from "../Post/PostUser";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";

export default function ProfilePopupUser(props) {
    const [followerUserInfo, setFollowerUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });

    useEffect(() => {
        PostDataService.getUserById(props.userId)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = DefaultProfilePicture;
                }
                setFollowerUserInfo(response.data);
            })
    }, [props.userId]);

    return (
        <div className="profile-popup-user">
            <PostUser 
                username={ followerUserInfo.username }
                profilePicture={ followerUserInfo.profilePicture }
            />
        </div>
    )
}
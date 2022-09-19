import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import ProfilePost from "./ProfilePost";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import defaultProfilePicture from "../../defaultProfilePicture.png";
import "./Profile.css";
import UserContext from "../../UserProvider";
import UserDataService from "../../services/UserDataService";

export default function Profile() {
    const [profileUserInfo, setProfileUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });

    const [posts, setPosts] = useState([]);

    const { username } = useParams();
    const navigate = useNavigate();
    const [userInfo] = useContext(UserContext);

    useEffect(() => {
        UserDataService.getUserByName(username)
            .then(response => {
                let profile = response.data;
                if (profile.profilePicture === "") {
                    profile.profilePicture = defaultProfilePicture;
                }
                setProfileUserInfo(profile);
                PostDataService.getPostsByUserId(profile.userId)
                    .then(response => {
                        let postsList = [];
                        for (const post of response.data.posts) {
                            postsList.push(
                                <ProfilePost 
                                    key={ post._id }
                                    postInfo={ post }
                                />
                            );
                        }
                        setPosts(postsList);
                    });
            })
            .catch(err => {
                navigate("/does-not-exist", { replace: true });
            })
    }, [navigate, username, userInfo.userId]);

    return (
        <div className="profile-page-container">
            <div className="profile-page">
                <ProfileHeader
                    profileUserInfo={ profileUserInfo }
                    posts={ posts }
                />
                <ProfileContent 
                    profileUserInfo={ profileUserInfo }
                    posts={ posts }
                />     
            </div>
        </div>
    )
}
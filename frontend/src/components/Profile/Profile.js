import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import ProfilePost from "./ProfilePost";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import "./Profile.css";
import UserContext from "../../UserProvider";

export default function Profile() {
    const [profileUserInfo, setProfileUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });

    const [posts, setPosts] = useState([]);

    const { username } = useParams();

    const [userInfo, setUserInfo] = useContext(UserContext);

    useEffect(() => {
        PostDataService.getUserByName(username)
            .then(response => {
                let profile = response.data;
                if (profile.profilePicture === "") {
                    profile.profilePicture = DefaultProfilePicture;
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
            });
    }, [username, userInfo.userId]);

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
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import ProfilePost from "./ProfilePost";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import gearIcon from "../../icons/gear.svg";
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

    const userInfo = useContext(UserContext);

    useEffect(() => {
        PostDataService.getUserByName(username)
            .then(response => {
                if (response.data.profilePicture === "") {
                    response.data.profilePicture = DefaultProfilePicture;
                }
                setProfileUserInfo(response.data);
                PostDataService.getPostsByUserId(response.data.userId)
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
    }, []);


    return (
        <div className="profile-page-container">
            <div className="profile-page">
            <div className="profile-page-header">
                <img
                    className="profile-page-picture" 
                    src={ profileUserInfo.profilePicture }
                />
                <div className="profile-page-header-info">
                    <div className="profile-page-header-info-top">
                        <p className="profile-page-username">{ profileUserInfo.username }</p>
                        <button>Edit profile</button>
                        <img src={ gearIcon } />
                    </div>
                    <div className="profile-page-header-info-bottom">
                        <span>
                            <strong>
                                { posts.length}
                            </strong>
                            &nbsp;
                            {
                                posts.length === 1
                                    ? "post"
                                    : "posts"
                            }
                        </span>
                        <span>
                            0 followers
                        </span>
                        <span>
                            0 following
                        </span>
                    </div>
                </div>
            </div>
            {/* <div>
                { 
                    userInfo.userId === profileUserInfo.userId
                        ? "hey" 
                        : "no"
                }
            </div> */}
            <div className="profile-page-images">
                
                { posts }
                <div id="empty"></div>
            </div>
            </div>
        </div>
    )
}
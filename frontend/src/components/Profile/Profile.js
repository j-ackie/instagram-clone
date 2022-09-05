import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import PostDataService from "../../services/PostDataService";
import ProfilePost from "./ProfilePost";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from "./ProfileFollowing";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import followingIcon from "../../icons/person-check-fill.svg";
import gearIcon from "../../icons/gear.svg";
import settingsIcon from "../../icons/three-dots.svg";
import gridIcon from "../../icons/grid.svg";
import tagIcon from "../../icons/person-square.svg";
import bookmarkIcon from "../../icons/bookmark.svg";
import "./Profile.css";
import UserContext from "../../UserProvider";

export default function Profile() {
    const [profileUserInfo, setProfileUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [posts, setPosts] = useState([]);

    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowersClicked, setIsFollowersClicked] = useState(false);
    const [isFollowingClicked, setIsFollowingClicked] = useState(false);

    const { username } = useParams();

    const userInfo = useContext(UserContext);

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
                PostDataService.getFollowers("userId", profile.userId)
                    .then(response => {
                        setFollowers(response.data.followers);
                        if (profile.userId !== userInfo.userId) {
                            setIsFollowing(response.data.followers.find(follower => follower.followerId === userInfo.userId));
                        }
                    });

                PostDataService.getFollowers("followerId", profile.userId)
                    .then(response => {
                        setFollowing(response.data.followers);
                    });
            });
    }, [username, userInfo.userId]);

    const handleFollow = () => {
        const data = {
            userId: profileUserInfo.userId
        };
        PostDataService.followUser(data)
            .then(response => {
                
            })
    }

    return (
        <div className="profile-page-container">
            <div className="profile-page">
            <div className="profile-page-header">
                <img
                    alt="Profile"
                    className="profile-page-picture" 
                    src={ profileUserInfo.profilePicture }
                />
                <div className="profile-page-header-info">
                    <div className="profile-page-header-info-top">
                        <p className="profile-page-username">{ profileUserInfo.username }</p>
                        {   
                            profileUserInfo.userId === userInfo.userId
                                ? <span>
                                    <button className="header-button">Edit profile</button>
                                    <img alt="Options" src={ gearIcon } />
                                  </span>
                                : <span>
                                    {
                                        isFollowing
                                            ? <button className="header-button"><img alt="Following" src={ followingIcon } /></button>
                                            : <button className="submit" onClick={ handleFollow }>Follow</button>
                                    }
                                    <img alt="Settings" src={ settingsIcon } />
                                  </span>
                            
                        }
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
                        <span className="clickable" onClick={ () => setIsFollowersClicked(true) }>
                            <strong>
                                { followers.length}
                            </strong>
                            &nbsp;
                            {
                                followers.length === 1
                                    ? "follower"
                                    : "followers"
                            }
                        </span>
                        <span className="clickable" onClick={ () => setIsFollowingClicked(true) }>
                            <strong>
                                { following.length}
                            </strong>
                            &nbsp;
                            {
                                "following"
                            }
                        </span>
                    </div>
                </div>
            </div>
            <div className="tabs">
                <span><img alt="" src={ gridIcon } /> POSTS </span>
                {
                    profileUserInfo.userId === userInfo.userId
                        ? <span><img alt="" src={ bookmarkIcon } /> SAVED </span>
                        : ""
                }
                <span><img alt="" src={ tagIcon } /> TAGGED </span>
            </div>
            <div className="profile-page-images">
                { posts }
                <div id="empty"></div>
            </div>
            </div>
            {
                isFollowersClicked
                    ? <ProfileFollowers
                        followers={ followers }
                        setIsFollowersClicked={ setIsFollowersClicked}
                      />
                    : ""
            }
            {
                isFollowingClicked
                    ? <ProfileFollowing
                        following={ following } 
                        setIsFollowingClicked={ setIsFollowingClicked }
                      />
                    : ""
            }
        </div>
    )
}
import { useState, useContext, useEffect } from "react";
import UserContext from "../../UserProvider";
import PostDataService from "../../services/PostDataService";
import Popup from "../Popup/Popup";
import ProfileFollowers from "./ProfileFollowers";
import ProfileFollowing from "./ProfileFollowing";
import ProfileUnfollow from "./ProfileUnfollow";
import followingIcon from "../../icons/person-check-fill.svg";
import gearIcon from "../../icons/gear.svg";
import settingsIcon from "../../icons/three-dots.svg";
import { useNavigate } from "react-router-dom";

export default function ProfileHeader(props) {
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);

    const [userInfo, setUserInfo] = useContext(UserContext); 

    const [isFollowing, setIsFollowing] = useState(false);
    const [isFollowersClicked, setIsFollowersClicked] = useState(false);
    const [isFollowingClicked, setIsFollowingClicked] = useState(false);

    const [isUnfollowClicked, setIsUnfollowClicked] = useState(false);

    const navigate = useNavigate();

    const createFollower = (followerId) => {
        return {
            userId: props.profileUserInfo.userId,
            followerId: followerId
        };
    }

    const handleFollow = () => {
        const data = {
            userId: props.profileUserInfo.userId
        };
        PostDataService.followUser(data)
            .then(response => {
                setIsFollowing(true);
                setFollowers([
                    ...followers,
                    createFollower(userInfo.userId)
                ]);
            });
    }

    useEffect(() => {
        if (!props.profileUserInfo.userId) {
            return;
        }

        PostDataService.getFollowers("userId", props.profileUserInfo.userId)
            .then(response => {
                setFollowers(response.data.followers);
                if (props.profileUserInfo.userId !== userInfo.userId) {
                    setIsFollowing(response.data.followers.find(follower => {
                        return follower.followerId === userInfo.userId
                    }));
                }
            });

        PostDataService.getFollowers("followerId", props.profileUserInfo.userId)
            .then(response => {
                setFollowing(response.data.followers);
            });

    }, [props.profileUserInfo])

    return (
        <div className="profile-page-header">
            <img
                alt="Profile"
                className="profile-page-picture" 
                src={ props.profileUserInfo.profilePicture }
            />
            <div className="profile-page-header-info-container">
            <div className="profile-page-header-info">
                <div className="profile-page-header-info-top">
                    <p className="profile-page-username">{ props.profileUserInfo.username }</p>
                    {   
                        props.profileUserInfo.userId === userInfo.userId
                            ? <span>
                                <button className="header-button">Edit profile</button>
                                <img alt="Options" src={ gearIcon } onClick={ () => navigate("/settings") }/>
                            </span>
                            : <span>
                                {
                                    isFollowing
                                        ? <button onClick={ () => setIsUnfollowClicked(true) } className="header-button">
                                            <img alt="Following" src={ followingIcon } />
                                          </button>
                                        : <button className="submit" onClick={ handleFollow }>
                                            Follow
                                          </button>
                                }
                                <img alt="Settings" src={ settingsIcon } />
                            </span>
                    }
                </div>
                <div className="profile-page-header-info-middle">
                    <span>
                        <strong>
                            { props.posts.length}
                        </strong>
                        &nbsp;
                        {
                            props.posts.length === 1
                                ? "post"
                                : "posts"
                        }
                    </span>
                    <span className="clickable" onClick={ () => setIsFollowersClicked(true) }>
                        <strong>
                            { followers.length }
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
                <div className="profile-page-header-info-bottom">
                    <p>
                        { props.profileUserInfo.bio }
                    </p>
                </div>
            </div>
            </div>
            <Popup
                variable={ isFollowersClicked }
                setVariable={ setIsFollowersClicked }
                content={ 
                    <ProfileFollowers
                        followers={ followers } 
                        setIsFollowersClicked={ setIsFollowersClicked }
                    /> 
                }
            />
            <Popup
                variable={ isFollowingClicked }
                setVariable={ setIsFollowingClicked }
                content={
                    <ProfileFollowing
                        following={ following }
                        setIsFollowingClicked={ setIsFollowingClicked }
                    />
                }
            />
            <Popup
                variable={ isUnfollowClicked }
                setVariable={ setIsUnfollowClicked }
                content={
                    <ProfileUnfollow
                        profileUserInfo={ props.profileUserInfo } 
                        setIsUnfollowClicked={ setIsUnfollowClicked }
                        setIsFollowing={ setIsFollowing }
                        followers={ followers }
                        setFollowers={ setFollowers }
                    />
                }
            />
        </div>
    )
}
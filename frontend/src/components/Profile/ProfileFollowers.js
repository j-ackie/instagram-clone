import ProfilePopupUser from "./ProfilePopupUser";

export default function ProfileFollowers(props) {
    const handleUserClick = () => {
        props.setIsFollowersClicked(false);
    }

    let followersList = [];
    for (const follower of props.followers) {
        followersList.push(
            <ProfilePopupUser
                key={ follower.followerId }
                userId={ follower.followerId }
                handleUserClick={ handleUserClick }
            />
        );
    }

    return (
        <div className="profile-popup">
            <div className="popup-header">
                Followers
            </div>
            <div className="profile-popup-users">
                { followersList }
            </div>
        </div>
    )
}
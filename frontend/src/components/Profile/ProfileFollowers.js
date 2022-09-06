import ProfilePopupUser from "./ProfilePopupUser";

export default function ProfileFollowers(props) {
    const handleClick = event => {
        if (event.target.id === "profile-followers") {
            props.setIsFollowersClicked(false);
        }
    }

    const handleUserClick = event => {
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
        <div className="pop-up" id="profile-followers" onClick={ handleClick }>
            <div className="profile-popup">
                <div className="popup-header">
                    Followers
                </div>
                <div className="profile-popup-users">
                    { followersList }
                </div>
            </div>
        </div>
    )
}
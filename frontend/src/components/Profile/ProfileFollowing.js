import ProfilePopupUser from "./ProfilePopupUser";

export default function ProfileFollowing(props) {
    const handleUserClick = () => {
        props.setIsFollowingClicked(false);
    }

    let followingList = [];
    for (const following of props.following) {
        followingList.push(
            <ProfilePopupUser
                key={ following.userId }
                userId={ following.userId }
                handleUserClick={ handleUserClick }
            />
        );
    }

    return (
        <div className="profile-popup">
            <div className="popup-header">
                Following
            </div>
            <div>
                { followingList }
            </div>
        </div>
    )
}
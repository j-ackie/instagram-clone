import ProfilePopupUser from "./ProfilePopupUser";

export default function ProfileFollowing(props) {
    const handleClick = event => {
        if (event.target.id === "profile-following") {
            props.setIsFollowingClicked(false);
        }
    }

    let followingList = [];
    for (const following of props.following) {
        followingList.push(
            <ProfilePopupUser
                key={ following.userId }
                userId={ following.userId }
            />
        );
    }

    return (
        <div className="pop-up" id="profile-following" onClick={ handleClick }>
            <div className="profile-popup">
                <div className="popup-header">
                    Following
                </div>
                <div>
                    { followingList }
                </div>
            </div>
        </div>
    )
}
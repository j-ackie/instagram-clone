import ProfilePopupUser from "../Profile/ProfilePopupUser";

export default function PostLikesPopup(props) {
    let likes = [];
    for (const like of props.likes) {
        console.log(props.likes)
        likes.push(
            <ProfilePopupUser
                key={ like.userId }
                userId={ like.userId }
            />
        )
    }

    return (
        <div id="post-likes">
            <div className="popup-header">
                Likes
            </div>
            <div>
                { likes }
            </div>
        </div>
    )
}
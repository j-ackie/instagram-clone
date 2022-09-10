export default function ProfilePosts(props) {
    return (
        <div className="profile-page-images">
            { props.posts }
            <div id="empty" />
        </div>
    )
}
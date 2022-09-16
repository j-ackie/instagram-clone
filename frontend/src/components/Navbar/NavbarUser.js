export default function NavbarUser(props) {
    return (
        <span className="post-user">
            <img 
                alt="Profile" 
                className="post-profile-photo profile-picture"
                src={ props.profilePicture }
            />
            <span className="post-username">{ props.username }</span>
        </span>
    )
}
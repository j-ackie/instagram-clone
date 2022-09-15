import { useContext, forwardRef } from "react";
import UserContext from "../../UserProvider";
import CreatePostPreview from "./CreatePostPreview";

const CreatePostSubmit = forwardRef((props, ref) => {
    const [userInfo, setUserInfo] = useContext(UserContext);

    return (
        <div id="create-post-submit">
            <div id="create-post-submit-preview">
                <CreatePostPreview files={ props.files } />
            </div>
            <div id="create-post-options">
                <div id="create-post-options-user">
                    <img
                        className="profile-picture"
                        src={ userInfo.profilePicture }
                    />
                    <span>
                        { userInfo.username }
                    </span>
                </div>
                <div id="caption">
                    <textarea
                        ref={ ref }
                        placeholder="Write a caption..."
                    />
                </div>
            </div>
        </div>
    )
})

export default CreatePostSubmit;
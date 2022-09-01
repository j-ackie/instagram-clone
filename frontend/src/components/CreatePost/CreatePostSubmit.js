import { useContext, forwardRef } from "react";
import UserContext from "../../UserProvider";

const CreatePostSubmit = forwardRef((props, ref) => {
    const userInfo = useContext(UserContext);

    return (
        <div id="create-post-submit">
            <div id="create-post-submit-preview">
                <img 
                    src={ URL.createObjectURL(props.file) }
                />
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

// export default function CreatePostSubmit(props) {
//     return (
//         <div id="create-post-submit">
//             <div id="create-post-submit-preview">
//                 <img 
//                     src={ URL.createObjectURL(props.file) }
//                 />
//             </div>
//             <div id="create-post-options">
//                 <span>
//                     <img
//                         src={ null }
//                     />
//                     <p>
//                         { userInfo.username }
//                     </p>
//                 </span>
//                 <div>
//                     <input
//                         ref={ inputRef }
//                         placeholder="Write a caption..."
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }
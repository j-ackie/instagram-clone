import { useContext, useRef } from "react";
import { handleError } from "../../helpers";
import UserDataService from "../../services/UserDataService";
import UserContext from "../../UserProvider";
import DefaultProfilePicture from "../../icons/DefaultProfilePicture.png";
import { useNavigate } from "react-router-dom";

export default function ProfilePhotoChangePopup(props) {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const handleUpload = event => {
        let data = new FormData();
        data.append("profilePicture", event.target.files[0]);
        UserDataService.updateUser(userInfo.userId, data)
            .then(response => {
                setUserInfo({
                    userId: userInfo.userId,
                    username: userInfo.username,
                    profilePicture: URL.createObjectURL(event.target.files[0]),
                    bio: userInfo.bio
                });
                props.setIsProfilePhotoChangeClicked(false);
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo })
            })
    }

    const handleRemove = () => {
        let data = new FormData();
        data.append("profilePicture", "");
        UserDataService.updateUser(userInfo.userId, data)
            .then(response => {
                setUserInfo({
                    userId: userInfo.userId,
                    username: userInfo.username,
                    profilePicture: DefaultProfilePicture,
                    bio: userInfo.bio
                });
                props.setIsProfilePhotoChangeClicked(false);
            });
    }

    return (
        <div id="profile-photo-change">
            <input
                type="file"
                accept="image/png, image/jpeg"
                ref={ inputRef }
                onChange={ handleUpload }
            />
            <ul>
                <li className="action" onClick={ () => inputRef.current.click() }>
                    Upload photo
                </li>
                <li className="important" onClick={ handleRemove }>
                    Remove current photo
                </li>
                <li onClick={ () => props.setIsProfilePhotoChangeClicked(false) }>
                    Cancel
                </li>
            </ul>
        </div>
    )
}
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../helpers";
import UserDataService from "../../services/UserDataService";
import UserContext from "../../UserProvider";

export default function ProfileUnfollow(props) {
    const [userInfo, setUserInfo] = useContext(UserContext);
    
    const navigate = useNavigate();

    const handleUnfollow = () => {
        UserDataService.unfollowUser(props.profileUserInfo.userId)
            .then(response => {
                console.log(response);
                props.setIsUnfollowClicked(false);
                props.setIsFollowing(false);
                props.setFollowers(props.followers.filter(element => {
                    return element.userId === userInfo.userId;
                }));
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            })
    }

    return (
        <div className="profile-popup" id="profile-unfollow">
            <ul>
                <li>
                    <img
                        alt="Unfollow"
                        className="unfollow-profile-picture"
                        src={ props.profileUserInfo.profilePicture }  
                    />
                    <p>Unfollow @{ props.profileUserInfo.username }?</p>
                </li>
                <li 
                    className="important clickable" 
                    onClick={ handleUnfollow }
                >
                    Unfollow
                </li>
                <li 
                    className="clickable" 
                    onClick={ () => props.setIsUnfollowClicked(false) }
                >
                    Cancel
                </li>
            </ul>
        </div>
    )
}
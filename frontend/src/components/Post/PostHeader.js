import { useState, useContext } from "react";
import UserContext from "../../UserProvider";
import Popup from "../Popup/Popup";
import PostOptions from "../PostOptions/PostOptions";
import PostUser from "./PostUser";
import OptionsIcon from "../Icons/OptionsIcon";

export default function PostHeader(props) {
    const [isOptionsIconClicked, setIsOptionsIconClicked] = useState(false);

    const [userInfo] = useContext(UserContext);
    
    return (
        <div className="header">
            <PostUser
                username={ props.username }
                profilePicture={ props.profilePicture }
            />
            <OptionsIcon onClick={ () => setIsOptionsIconClicked(true) }/>
            <Popup 
                variable={ isOptionsIconClicked }
                setVariable={ setIsOptionsIconClicked }
                content={
                    <PostOptions
                        isUserPost={ props.postInfo.userId === userInfo.userId }
                        isExtendedPost={ props.isExtendedPost }
                        selectedPostId={ props.postInfo._id }
                        setIsOptionsIconClicked={ setIsOptionsIconClicked }
                    />
                }
            />
        </div>
    )
}
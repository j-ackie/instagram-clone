import { useOutletContext } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../UserProvider";
import PostUser from "./PostUser";
import OptionsIcon from "../Icons/OptionsIcon";

export default function PostHeader(props) {
    return (
        <div className="header">
            <PostUser
                username={ props.username }
                profilePicture={ props.profilePicture }
            />
            <OptionsIcon onClick={ () => props.handleOptionsClick(props.postInfo._id, props.postInfo.user_id) }/>
        </div>
    )
}
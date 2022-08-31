import { useOutletContext } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../UserProvider";
import PostUser from "./PostUser";
import PostOptions from "../PostOptions/PostOptions";
import OptionsIcon from "../Icons/OptionsIcon";

export default function PostHeader(props) {
    const OutletContext = useOutletContext();
    const handleOptionsClick = OutletContext.handleOptionsClick;
    
    return (
        <div className="header">
            <PostUser
                username={ props.username }
                profilePicture={ props.profilePicture }
            />
            <OptionsIcon onClick={ () => handleOptionsClick(props.postInfo._id, props.postInfo.userId) }/>
        </div>
    )
}
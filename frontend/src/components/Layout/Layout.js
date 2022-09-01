import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../../UserProvider";
import Navbar from "../Navbar/Navbar";
import CreatePost from "../CreatePost/CreatePost";
import PostOptions from "../PostOptions/PostOptions";
import "./Layout.css";

export default function Layout(props) {
    const [posts, setPosts] = useState([]);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);
    const [isOptionsIconClicked, setIsOptionsIconClicked] = useState(false);
    const [isProfilePictureClicked, setIsProfilePictureClicked] = useState(false);
    const [isActivityIconClicked, setIsActivityIconClicked] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isUserPost, setIsUserPost] = useState(false);

    const userInfo = useContext(UserContext);

    const handleClick = event => {
        if (isProfilePictureClicked && event.target.parentElement.parentElement.id !== "profile-picture-popup") {
            setIsProfilePictureClicked(false);
        }
        if (isActivityIconClicked && event.target.parentElement.parentElement.id !== "activity-icon-popup") {
            setIsActivityIconClicked(false);
        }
    }

    const handleOptionsClick = (postId, postUserId) => {
        setIsOptionsIconClicked(true);
        setSelectedPostId(postId);
        setIsUserPost(postUserId === userInfo.userId);
    }

    return (
        <div onClick={ handleClick }>
            <Navbar
                setUserInfo={ props.setUserInfo }
                isPostIconClicked={ isPostIconClicked } 
                setIsPostIconClicked={ setIsPostIconClicked }
                isProfilePictureClicked={ isProfilePictureClicked }
                setIsProfilePictureClicked={ setIsProfilePictureClicked }
                isActivityIconClicked={ isActivityIconClicked }
                setIsActivityIconClicked={ setIsActivityIconClicked }
            />
            <Outlet
                context={ {
                    posts: posts,
                    setPosts: setPosts,
                    handleOptionsClick: handleOptionsClick
                } }
            />
            { 
                isPostIconClicked
                    ? <CreatePost
                        setIsPostIconClicked={ setIsPostIconClicked }
                        posts={ posts }
                        setPosts={ setPosts }
                    />
                    : ''
            }
            {
                isOptionsIconClicked
                    ? <PostOptions
                        isUserPost={ isUserPost }
                        selectedPostId={ selectedPostId }
                        setIsOptionsIconClicked={ setIsOptionsIconClicked }
                        posts={ posts }
                        setPosts={ setPosts }
                      />
                    : ''
            }
        </div>
    )
}
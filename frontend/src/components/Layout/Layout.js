import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CreatePost from "../CreatePost/CreatePost";
import PostOptions from "../PostOptions/PostOptions";
import "./Layout.css";

export default function Layout(props) {
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);
    const [isOptionsIconClicked, setIsOptionsIconClicked] = useState(false);

    // const handleOptionsClick = (postId, postUserId) => {
    //     setIsOptionsIconClicked(true);
    //     setSelectedPostId(postId);
    //     if (postUserId === props.userInfo.userId) {
    //         setIsUserPost(true);
    //     }
    //     else {
    //         setIsUserPost(false);
    //     }
    // }

    return (
        <div>
            <Navbar 
                setIsPostIconClicked={ setIsPostIconClicked }
            />
            <Outlet 
                context={ [props.userInfo, 4] }
            />
            { 
                isPostIconClicked
                    ? <CreatePost
                        setIsPostIconClicked={ setIsPostIconClicked }
                    />
                    : ''
            }
            {/* {
                isOptionsIconClicked
                    ? <PostOptions
                        userInfo={ props.userInfo } 
                        isUserPost={ isUserPost }
                        selectedPostId={ selectedPostId }
                        setIsOptionsIconClicked={ setIsOptionsIconClicked }
                        handleDelete={ handleDelete }
                      />
                    : ''
            } */}
        </div>
    )
}
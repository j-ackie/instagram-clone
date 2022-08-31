import { useContext, useState } from "react";
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
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isUserPost, setIsUserPost] = useState(false);

    const userInfo = useContext(UserContext);

    const handleOptionsClick = (postId, postUserId) => {
        setIsOptionsIconClicked(true);
        setSelectedPostId(postId);
        setIsUserPost(postUserId === userInfo.userId);
    }

    return (
        <div>
            <Navbar 
                setIsPostIconClicked={ setIsPostIconClicked }
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
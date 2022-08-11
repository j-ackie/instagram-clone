import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import CreatePost from "../CreatePost/CreatePost"
import Post from '../Post/Post';
import { useState, useEffect } from "react";

import PostDataService from '../../services/PostDataService';

export default function Content(props) {

    const [posts, setPosts] = useState([]);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);

    const handleLike = (postId, numLikes, setNumLikes) => {
        let data = {
            post_id: postId,
            user_id: props.userInfo.userId
        }
        PostDataService.likePost(data)
            .then(response => {
                setNumLikes(numLikes + 1);
                console.log(response);
            });
    }

    const getAllPosts = () => {
        PostDataService.getAll()
            .then(response => {
                let postsList = [];
                for (const post of response.data.posts) {
                    postsList.push(
                        <Post
                            postInfo={ post }
                            handleLike={ handleLike }
                        />
                    );
                }
                setPosts(postsList);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllPosts();
    }, [props.userInfo]);

    return (
        <div id="content">
            <Navbar
                userInfo={ props.userInfo }
                setUserInfo={ props.setUserInfo }
                setIsPostIconClicked={ setIsPostIconClicked }
            />
            <Home
                posts={ posts }
                userInfo={ props.userInfo }
            />
            { isPostIconClicked
                ? <CreatePost
                    userInfo={ props.userInfo }
                    getAllPosts={ getAllPosts } 
                    setIsPostIconClicked={ setIsPostIconClicked }
                  />
                : ''
            }
        </div>
    )
}
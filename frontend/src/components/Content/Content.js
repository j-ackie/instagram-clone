import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import CreatePost from "../CreatePost/CreatePost"
import Post from '../Post/Post';
import { useState, useEffect } from "react";

import PostDataService from '../../services/PostDataService';

export default function Content(props) {

    const [posts, setPosts] = useState([]);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);

    const handleLike = async(postId, numLikes, setNumLikes) => {
        let data = {
            post_id: postId,
            user_id: props.userInfo.userId
        }
        PostDataService.likePost(data)
            .then(response => {
                if (response.data.status === "success") {
                    setNumLikes(numLikes + 1);
                }
            });
    }

    const handleComment = async(postId, comment) => {
        let data = {
            post_id: postId,
            user_id: props.userInfo.userId,
            comment: comment
        };
        PostDataService.commentPost(data)
            .then(response => {
                if (response.data.status === "success") {
                    console.log(response.data);
                }
            })
    }

    const getAllPosts = () => {
        PostDataService.getAll()
            .then(response => {
                let postsList = [];
                for (const post of response.data.posts) {
                    let isLiked = post.likes.includes(props.userInfo.userId);
                    postsList.push(
                        <Post
                            key={ post._id }
                            postInfo={ post }
                            isLiked={ isLiked }
                            handleLike={ handleLike }
                            handleComment={ handleComment }
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
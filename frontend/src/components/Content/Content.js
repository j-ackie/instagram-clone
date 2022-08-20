import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import CreatePost from "../CreatePost/CreatePost"
import Post from '../Post/Post';
import { useState, useEffect } from "react";
import "./Content.css"

import PostDataService from '../../services/PostDataService';
import PostOptions from "../PostOptions/PostOptions";

export default function Content(props) {
    const [posts, setPosts] = useState([]);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);
    const [isOptionsIconClicked, setIsOptionsIconClicked] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [isUserPost, setIsUserPost] = useState(false);

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

    const handleDelete = () => {
        let data = {
            postId: selectedPostId,
            userId: props.userInfo.userId
        }
        PostDataService.deletePost(data)
            .then(response => {
                if (response.data.status === "success") {
                    setPosts(posts.filter((post) => {
                        return post.props.postInfo._id !== selectedPostId;
                    }));
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
                            handleOptionsClick={ handleOptionsClick }
                        />
                    );
                }
                setPosts(postsList);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleOptionsClick = (postId, postUserId) => {
        setIsOptionsIconClicked(true);
        setSelectedPostId(postId);
        if (postUserId === props.userInfo.userId) {
            setIsUserPost(true);
        }
        else {
            setIsUserPost(false);
        }
    }

    useEffect(() => {
        console.log(props.userInfo);
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
            />
            { 
                isPostIconClicked
                    ? <CreatePost
                        userInfo={ props.userInfo }
                        getAllPosts={ getAllPosts } 
                        setIsPostIconClicked={ setIsPostIconClicked }
                    />
                    : ''
            }
            {
                isOptionsIconClicked
                    ? <PostOptions
                        userInfo={ props.userInfo } 
                        isUserPost={ isUserPost }
                        selectedPostId={ selectedPostId }
                        setIsOptionsIconClicked={ setIsOptionsIconClicked }
                        handleDelete={ handleDelete }
                      />
                    : ''
            }
        </div>
    )
}
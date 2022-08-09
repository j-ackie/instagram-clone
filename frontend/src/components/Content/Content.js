import Home from "../Home/Home";
import Navbar from "../Navbar/Navbar"
import CreatePost from "../CreatePost/CreatePost"
import Post from '../Post/Post';
import { useState } from "react";

import PostDataService from '../../services/PostDataService';

export default function Content(props) {

    const [posts, setPosts] = useState([]);
    const [isPostIconClicked, setIsPostIconClicked] = useState(false);

    const [hey, setHey] = useState(null);

    const getAllPosts = () => {
        PostDataService.getAll()
            .then(response => {
                let postsList = [];
                for (const post of response.data.posts) {
                    console.log(post);
                    postsList.push(
                        <Post
                            key={ post._id }
                            postInfo={ post }
                        />
                    );
                }
                setPosts(postsList);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div id="content">
            <Navbar
                userInfo={ props.userInfo }
                setUserInfo={ props.setUserInfo }
                getAllPosts={ getAllPosts }
                setIsPostIconClicked={ setIsPostIconClicked }
            />
            <Home
                posts={posts}
                getAllPosts={getAllPosts}
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
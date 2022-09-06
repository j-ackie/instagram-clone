import Post from '../Post/Post';
import { useState, useEffect, useContext } from "react";
import "./Content.css"

import PostDataService from '../../services/PostDataService';
import PostOptions from "../PostOptions/PostOptions";
import UserContext from "../../UserProvider";
import { useOutletContext } from "react-router-dom";

export default function Content(props) {
    const OutletContext = useOutletContext();
    const posts = OutletContext.posts;
    const setPosts = OutletContext.setPosts;

    const getAllPosts = () => {
        PostDataService.getAll()
            .then(response => {
                console.log(response);
                let postsList = [];
                for (const post of response.data.posts) {
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

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div id="content">
            <div id="home">
                { posts }
                <button
                    onClick={ PostDataService.reset }
                >
                    RESET
                </button>
            </div>
        </div>
    )
}
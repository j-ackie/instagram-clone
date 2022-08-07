import Post from "../Post/Post";
import { useState } from "react";
import PostDataService from "../../services/post"

export default function Home() {
    const [posts, setPosts] = useState([]);

    PostDataService.getAll()
        .then(response => {
            let postsList = [];
            for (const post of response.data.posts) {
                postsList.push(
                    <Post
                        username={ post.text }
                    />
                );
            }
            setPosts(postsList);
        })
        .catch(err => {
            console.log(err);
        });

    return (
        <div id="Home">
            { posts }
            <Post 
                username="hey"
            />

            <button
                onClick={ PostDataService.reset }
            >
                RESET
            </button>
        </div>
    )
}
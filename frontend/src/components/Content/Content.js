import Post from '../Post/Post';
import { useState, useEffect } from "react";
import "./Content.css"
import PostDataService from '../../services/PostDataService';
import { useOutletContext } from "react-router-dom";

export default function Content(props) {
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = useOutletContext();

    const createPostsList = posts => {
        let postsList = [];
        for (const post of posts) {
            postsList.push(
                <Post
                    key={ post._id }
                    postInfo={ post }
                />
            );
        }
        return postsList;
    }

    const getAllPosts = () => {
        PostDataService.getAll()
            .then(response => {
                const postsList = createPostsList(response.data.posts);
                setPosts(postsList);
                setIsLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const getMorePosts = () => {
        if (isLoading) {
            return;
        }
        if ((window.innerHeight + window.scrollY) >= 0.75 * document.body.offsetHeight && hasNext) {
            PostDataService.getAll(page + 1)
                .then(response => {
                    const postsList = createPostsList(response.data.posts);

                    const newPostsList = [...posts, ...postsList];

                    setPosts(newPostsList);
                    setPage(page + 1);

                    if (newPostsList.length === response.data.numPosts) {
                        setHasNext(false);
                    }
                });
        }
    }

    const scrollHandler = () => {
        setIsScrolling(!isScrolling);
    }

    useEffect(() => {
        getAllPosts();
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, [scrollHandler])

    useEffect(() => {
        if (isScrolling) {
            getMorePosts();
        }   
    }, [isScrolling]);

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
import { useState, useEffect, useContext } from "react";
import "./Content.css"
import PostDataService from '../../services/PostDataService';
import Post from '../Post/Post';
import { useNavigate, useOutletContext } from "react-router-dom";
import { handleError } from '../../helpers';
import UserContext from '../../UserProvider';

export default function Content(props) {
    const [page, setPage] = useState(0);
    const [hasNext, setHasNext] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [, setUserInfo] = useContext(UserContext);
    
    const { posts, setPosts } = useOutletContext();
    const navigate = useNavigate();

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

    useEffect(() => {
        PostDataService.getAll()
            .then(response => {
                const postsList = createPostsList(response.data.posts);
                setPosts(postsList);
                setIsLoading(false);
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            });
    }, [navigate, setUserInfo, setPosts]);

    useEffect(() => {
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
                        setPage(page => page + 1);
    
                        if (newPostsList.length >= response.data.numPosts) {
                            setHasNext(false);
                        }
                    })
                    .catch(err => {
                        handleError(err, { navigate, setUserInfo });
                    });
            }
        }

        if (isScrolling) {
            getMorePosts();
        }   

        const scrollHandler = () => {
            setIsScrolling(!isScrolling);
        }

        window.addEventListener("scroll", scrollHandler);

        return () => window.removeEventListener("scroll", scrollHandler);
    }, [isScrolling, hasNext, isLoading, navigate, page, posts, setPosts, setUserInfo]);

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
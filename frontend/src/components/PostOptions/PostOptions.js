import { useContext } from "react";
import { useNavigate } from "react-router";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";
import "./PostOptions.css"

export default function PostOptions(props) {
    const userInfo = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (event) => {
        if (event.target.id === "post-options") {
            props.setIsOptionsIconClicked(false);
        }
    };

    const handleDelete = () => {
        const data = {
            postId: props.selectedPostId,
            userId: userInfo.userId
        };

        PostDataService.deletePost(data)
            .then(response => {
                props.setIsOptionsIconClicked(false);
                props.setPosts(props.posts.filter(post => {
                    return post.props.postInfo._id !== props.selectedPostId;
                }));
            })
    };

    const GoToPost = () => {
        return (
            <li
                onClick={ () => {
                    navigate("/post/" + props.selectedPostId);
                    props.setIsOptionsIconClicked(false);
                } }
            >
                Go to post
            </li>
        )
    }

    const Cancel = () => {
        return (
            <li 
                onClick={ () => props.setIsOptionsIconClicked(false) }
            >
                Cancel
            </li>
        )
    }

    let options;
    if (props.isUserPost) {
        options = (
            <ul>
                <li className="important" onClick={ handleDelete }>Delete</li>
                <li>Edit</li>
                <li>Hide like count</li>
                <li>Turn off commenting</li>
                <GoToPost />
                <Cancel />
            </ul>
        )
    }
    else {
        options = (
            <ul>
                <GoToPost />
                <li>Share to...</li>
                <li>Copy link</li>
                <Cancel />
            </ul>
        )
    }

    return (
        <div className="pop-up" id="post-options" onClick={ handleClick }>
            <div>
                { options }
            </div>
        </div>
    )
}
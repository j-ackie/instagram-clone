import { useContext } from "react";
import { useNavigate } from "react-router";
import { handleError } from "../../helpers";
import PostDataService from "../../services/PostDataService";
import UserContext from "../../UserProvider";
import "./PostOptions.css"

export default function PostOptions(props) {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const navigate = useNavigate();

    const handleDelete = () => {
        PostDataService.deletePost(props.selectedPostId)
            .then(response => {
                props.setIsOptionsIconClicked(false);
                if (props.isExtendedPost) {
                    navigate("/user/" + userInfo.username);
                }
                else {
                    navigate(0);
                }
            })
            .catch(err => {
                handleError(err, { navigate, setUserInfo });
            })
    };

    const handleCopy = async() => {
        props.setIsOptionsIconClicked(false);
        return await navigator.clipboard.writeText(
            `https://instagram-clone-j-ackie.vercel.app/post/${props.selectedPostId}`
        );
    }

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
                <GoToPost />
                <Cancel />
            </ul>
        )
    }
    else {
        options = (
            <ul>
                <GoToPost />
                <li onClick={ handleCopy }>Copy link</li>
                <Cancel />
            </ul>
        )
    }

    return (
        <div id="post-options">
            { options }
        </div>
    )
}
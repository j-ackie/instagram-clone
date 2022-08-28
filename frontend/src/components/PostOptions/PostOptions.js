import PostDataService from "../../services/PostDataService";
import "./PostOptions.css"

export default function PostOptions(props) {
    const handleClick = (event) => {
        if (event.target.id === "post-options") {
            props.setIsOptionsIconClicked(false);
        }
    }

    let options;
    if (props.isUserPost) {
        options = (
            <ul>
                <li className="important" onClick={ props.handleDelete }>Delete</li>
                <li>Edit</li>
                <li>Hide like count</li>
                <li>Turn off commenting</li>
                <li>Go to post</li>
                <li onClick={ () => props.setIsOptionsIconClicked(false) }>Cancel</li>
            </ul>
        )
    }
    else {
        options = (
            <ul>
                <li>Go to post</li>
                <li>Share to...</li>
                <li>Copy link</li>
                <li onClick={ () => props.setIsOptionsIconClicked(false) }>Cancel</li>
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
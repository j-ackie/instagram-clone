import { Link } from "react-router-dom";

export default function PostDescription(props) {
    return (
        <div className="description">
            <Link to={ `/user/${props.username}` }>{ props.username }</Link>
            <span>
                <p>
                    { props.caption }
                </p>
            </span>
        </div>
    )
}
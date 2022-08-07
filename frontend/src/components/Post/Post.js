import { Link } from "react-router-dom";
import "./Post.css"

export default function Post(props) {
    return (
        <div className="post">
            {/* Image here */}
            <Link to="/a">{ props.username }</Link>
            <img 
                src={ props.image_url }
            />
        </div>
    )
}
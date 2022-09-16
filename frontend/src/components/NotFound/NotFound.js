import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound(props) {
    return (
        <div id="not-found">
            <h2>Sorry, this page is not available.</h2>
            <p>
                The link you followed may be broken, or the page may have been removed.
                <Link to="/"> Go back to Instagram.</Link>
            </p>
        </div>
    )
}
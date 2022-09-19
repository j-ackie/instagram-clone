import { Link } from "react-router-dom";
import Text from "../Text/Text";

export default function PostDescription(props) {
    return (
        <div className="description">
            <Link to={ `/user/${props.username}` }>{ props.username }</Link>
            <span>
                <Text
                    content={ props.caption }
                />
            </span>
        </div>
    )
}
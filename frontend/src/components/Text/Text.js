import { Link } from "react-router-dom";
import "./Text.css";

export default function Text(props) {

    const content = props.content.trim();

    const contentArray = content.split(" ");
    let i = 0;
    let resArray = [];
    for (const word of contentArray) {
        if (word[0] === '@' && word.length > 1) {
            resArray.push(
                <Link key={ i } to={ `/user/${word.slice(1)}` }>
                    { word }
                </Link>
            );
        }
        else if (word[0] === '#' && word.length > 1) {
            resArray.push(
                <span key={ i } className="hashtag">
                    { word }
                </span>
            );
        }
        else {
            resArray.push(word);
        }
        if (i < contentArray.length - 1) {
            resArray.push(<span key={ i + "space" } className="space"/>);
        }
        i++;
    }

    return (
        <p className="text">
            { resArray }
        </p>
    )
}
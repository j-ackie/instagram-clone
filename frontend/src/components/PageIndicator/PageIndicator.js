import dot from "../../icons/dot.svg";
import selectedDot from "../../icons/dot-selected.svg";
import PageIndicatorDots from "./PageIndicatorDots";
import "./PageIndicator.css";

export default function PageIndicator(props) {
    let dotList = [];
    for (let i = 0; i < props.length; i++) {
        if (i === props.currImageIndex) {
            dotList.push(
                <img key={ i } src={ selectedDot } />
            );
        }
        else {
            dotList.push(
                <img key={ i } src={ dot } />
            );
        }
    }

    return (
        <div className="page-indicator-container">
            <div />
            <PageIndicatorDots
                length={ props.length }
                currImageIndex={ props.currImageIndex }
            />
        </div>
    )
}
import dot from "../../icons/dot.svg";
import selectedDot from "../../icons/dot-selected.svg";

export default function PageIndicatorDots(props) {
    if (props.length === 1) {
        return;
    }

    let dotList = [];
    for (let i = 0; i < props.length; i++) {
        if (i === props.currImageIndex) {
            dotList.push(
                <img alt="Selected dot" key={ i } src={ selectedDot } />
            );
        }
        else {
            dotList.push(
                <img alt="Dot" key={ i } src={ dot } />
            );
        }
    }

    return (
        <div className="page-indicator-dots">
            { dotList }
        </div>
    )
}
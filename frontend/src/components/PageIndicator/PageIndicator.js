import PageIndicatorDots from "./PageIndicatorDots";
import "./PageIndicator.css";

export default function PageIndicator(props) {
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
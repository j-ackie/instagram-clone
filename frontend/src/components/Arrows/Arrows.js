import leftArrow from "../../icons/arrow-left-circle-fill.svg";
import rightArrow from "../../icons/arrow-right-circle-fill.svg";
import "./Arrows.css"

export default function Arrows(props) {
    return (
        <div id="arrows-container">
            { props.currImageIndex > 0 
                ? <img 
                    alt="Previous"
                    src={ leftArrow } 
                    onClick={ () => props.setCurrImageIndex(props.currImageIndex - 1) } 
                  /> 
                : <div /> 
            }
            { props.currImageIndex < props.length - 1 
                ? <img 
                    alt="Next"
                    src={ rightArrow } 
                    onClick={ () => props.setCurrImageIndex(props.currImageIndex + 1) } 
                  /> 
                : <div /> 
            }
        </div>
    )
}
import "./Popup.css";

export default function Popup(props) {
    if (!props.variable) {
        return;
    }
    
    const handleClick = event => {
        if (event.target.className === "pop-up") {
            props.setVariable(false);
        }
    }

    return (
        <div className="pop-up" onClick={ handleClick }>
            { props.content }
        </div>
    )
}
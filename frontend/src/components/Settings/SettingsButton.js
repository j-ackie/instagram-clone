export default function SettingsButton(props) {
    return (
        <div className="settings-field">
            <div className="settings-field-left"/>
            <div className="settings-field-right">
                <button 
                    onClick={ props.handleClick } 
                    className="submit"
                    disabled={ props.isDisabled() }
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
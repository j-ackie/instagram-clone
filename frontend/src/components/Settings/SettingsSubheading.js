export default function SettingsSubheading(props) {
    return (
        <div className="settings-field">
            <div className="settings-field-left"/>
            <div className="settings-field-right">
                <p>
                    { props.text }
                </p>
            </div>
        </div>
    )
}
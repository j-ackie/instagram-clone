import SettingsSubheading from "./SettingsSubheading";
import SettingsButton from "./SettingsButton";

export default function SettingsSection(props) {
    return (
        <div className="settings-section">
            <SettingsSubheading
                text={ props.subheading }
            />
            { props.children }
            <SettingsButton
                handleClick={ props.handleClick }
                isDisabled={ props.isDisabled }
            />
        </div>
    )
}
import PasswordField from "../LoginRegisterPage/PasswordField";

export default function SettingsField(props) {
    let input;
    if (props.fieldType === "textarea") {
        input = (
            <textarea
                value={ props.fieldValue }
                onChange={ event => props.setFieldValue(event.target.value) }
            />
        );
    }
    else if (props.fieldType === "password") {
        input = (
            <PasswordField
                password={ props.fieldValue }
                setPassword={ props.setFieldValue }
            />
        )
    }

    else {
        input = (
            <input
                value={ props.fieldValue }
                onChange={ event => props.setFieldValue(event.target.value) }
            />
        );
    }

    return (
        <div className="settings-field">
            <span className="settings-field-left">
                <strong>
                    { props.fieldName }
                </strong>
            </span>
            <span className="settings-field-right">
                { input }
            </span>
        </div>
    )
}
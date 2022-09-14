import { useState } from "react";
import UserDataService from "../../services/UserDataService";
import SettingsSection from "./SettingsSection";
import SettingsField from "./SettingsField";
import PasswordField from "../LoginRegisterPage/PasswordField";
import SettingsButton from "./SettingsButton";

export default function SettingsPassword(props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isDisabled = () => {
        return oldPassword === "" || newPassword === "" || confirmPassword === "";
    }

    const handleClick = () => {
        if (newPassword !== confirmPassword) {
            return;
        }
        const data = {
            
        }
        // UserDataService.
    }

    return (
        <SettingsSection 
            subheading="Password"
            isDisabled={ isDisabled }
            handleClick={ handleClick }
        >
            <SettingsField 
                fieldName={ "Old password" }
                fieldValue={ oldPassword }
                setFieldValue={ setOldPassword }
                fieldType={ "password" }
            />
            <SettingsField
                fieldName="New password"
                fieldValue={ newPassword }
                setFieldValue={ setNewPassword }
                fieldType={ "password" }
            />
            <SettingsField
                fieldName="Confirm new password"
                fieldValue={ confirmPassword }
                setFieldValue={ setConfirmPassword }
                fieldType={ "password" }
            />
        </SettingsSection>
    )
}
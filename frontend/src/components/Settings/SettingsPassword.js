import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthDataService from "../../services/AuthDataService";
import SettingsSection from "./SettingsSection";
import SettingsField from "./SettingsField";
import UserContext from "../../UserProvider";
import { handleError } from "../../helpers";

export default function SettingsPassword(props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [userInfo, setUserInfo] = useContext(UserContext);
    const navigate = useNavigate();

    const isDisabled = () => {
        return oldPassword === "" || newPassword === "" || confirmPassword === "";
    }

    const handleClick = () => {
        if (newPassword !== confirmPassword || isDisabled()) {
            alert("passwords do not match");
            return;
        }
        const data = {
            oldPassword: oldPassword,
            newPassword: confirmPassword
        };
        AuthDataService.updatePassword(userInfo.userId, data)
            .then(response => {
                navigate(0);
            })
            .catch(err => {
                alert(err.response.data.error);
                handleError(err, { navigate, setUserInfo });
            })
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
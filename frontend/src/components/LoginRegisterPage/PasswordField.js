import { useState } from "react";

export default function PasswordField(props) {
    const [isShowingPassword, setIsShowingPassword] = useState(false);
    return (
        <div id="password-input">
            <input 
                type={
                    isShowingPassword
                        ? "text"
                        : "password"
                }
                autoComplete={ props.isNewPassword ? "new-password" : "" }
                value={ props.password }
                placeholder={ props.placeholder }
                onChange={ event => props.setPassword(event.target.value) }
            />
            {
                props.password !== ""
                    ? <button onClick={ () => setIsShowingPassword(!isShowingPassword) }>
                        {
                            isShowingPassword
                                ? "Hide"
                                : "Show"
                        }
                        </button>
                    : ""
            }
        </div>
    )
}
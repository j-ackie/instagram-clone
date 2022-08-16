import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./LoginRegisterPage.css";

export default function LoginRegisterPage(props) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div id="login-register-page">
            { isLogin
                ? <LoginPage 
                    setUserInfo={ props.setUserInfo }
                    setIsLogin={ setIsLogin }
                />
                : <RegisterPage
                    setIsLogin={ setIsLogin }
                />
            }
        </div>
    )
}
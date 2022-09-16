import { useNavigate } from "react-router-dom";
import LoginContainer from "./LoginContainer";
import "./LoginRegisterPage.css"

export default function LoginPage(props) {
    const navigate = useNavigate();

    return (
        <div className="login-register-page">
            <LoginContainer isLoginPage={ true }/>
            <div className="alternative-container">
                <span>
                    <p>
                        Don't have an account? <span onClick={ () => navigate("/register") } id="register">Sign up</span>
                    </p>
                </span>
            </div>
        </div>
    )
}
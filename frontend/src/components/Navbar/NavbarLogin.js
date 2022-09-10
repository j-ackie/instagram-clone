import { useLocation, useNavigate } from "react-router-dom";

export default function NavbarLogin(props) {
    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)

    return (
        <div id="right-container">
            <button className="submit" onClick={ () => navigate("/login", {
                state: location.pathname
            }) }>
                Login
            </button>
            <button className="register" onClick={ () => navigate("/register", {
                state: location.pathname
            }) }>
                Sign up
            </button>
        </div>
    )
}
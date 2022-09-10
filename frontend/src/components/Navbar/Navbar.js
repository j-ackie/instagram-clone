import { useState, useContext, useRef, useEffect } from "react";
import UserContext from "../../UserProvider";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import NavbarIcons from "./NavbarIcons";
import NavbarLogin from "./NavbarLogin";
import SearchPopup from "./SearchPopup";
import instagramLogo from "../../icons/instagram_logo.png"
import "./Navbar.css";
import PostDataService from "../../services/PostDataService";

export default function Navbar(props) {
    const [isSearchClicked, setIsSearchClicked] = useState(false);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [userInfo, setUserInfo] = useContext(UserContext);
    const searchRef = useRef(null);

    const handleChange = event => {
        setSearch(event.target.value);

        let query = event.target.value;
        query = query.trim();
        query = query.replace(/\s/g, "+");

        if (!query) {
            return;
        }

        PostDataService.searchUsers(query)
            .then(response => {
                setSuggestedUsers(response.data.users);
            });
    }

    const handleOnMouseDown = event => {
        event.preventDefault();
    }

    useEffect(() => {
        if (!search) {
            setSuggestedUsers([]);
        }
    }, [search]);

    return (
        <nav>
            <div id="left-container">
                <Link
                    to="/"
                >
                    <img
                        src={ instagramLogo }
                    />
                </Link>
            </div>
            <div id="center-container">
                <input
                    value={ search }
                    ref={ searchRef }
                    onFocus={ () => setIsSearchClicked(true) }
                    onBlur={ () => setIsSearchClicked(false) }
                    onChange={ handleChange }
                    placeholder="Search"
                />
                {
                    isSearchClicked
                        ? <SearchPopup
                            searchRef={ searchRef }
                            onMouseDown={ handleOnMouseDown }
                            suggestedUsers={ suggestedUsers }
                            setIsSearchClicked={ setIsSearchClicked }
                          />
                        : ""
                }
            </div>
            {
                userInfo.userId !== ""
                    ? <NavbarIcons
                        event={ props.event }
                      />
                    : <NavbarLogin

                      />
            }

        </nav>
    )
}
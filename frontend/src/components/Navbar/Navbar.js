import { useState, useEffect } from "react";
import PostDataService from "../../services/PostDataService";
import "./Navbar.css";

export default function Navbar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(props.user != null);
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleClick = () => {
        console.log("hey")
        let data = {
            text: input
        };
        PostDataService.createPost(data)
            .then(response => {
                console.log("HEYY")
                props.getAllPosts();
            });
    }

    const handleSubmit = async() => {
        let data = {
            username: username,
            password: password
        };
        PostDataService.login(data)
            .then(response => {
                console.log(response)
                if (response.data.status === "success") {
                    props.setUser(data.username);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <nav>
            <h1>Instagram</h1>
            <input
                value={input}
                onChange={event => setInput(event.target.value)}    
            />

            <button
                onClick={ handleClick }
            >
                hey
            </button>
            <input 
                value={ username }
                onChange={ event => setUsername(event.target.value) }
            />
            <input
                value={ password }
                onChange={ event => setPassword(event.target.value) }
            />
            <button
                onClick={ handleSubmit }
            >
                SUBMIT
            </button>
            <h1>
                { props.user }
            </h1>

            <button onClick={ () => {console.log(props.user, isLoggedIn)} }>
                test
            </button>
        </nav>
    )
}
import { useState } from "react";
import PostDataService from "../../services/post";
import "./Navbar.css";

export default function Navbar() {
    const [input, setInput] = useState("");

    const handleClick = () => {
        let data = {
            text: input
        };
        PostDataService.createPost(data);
    }

    return (
        <nav>
            <h1>Instagram</h1>
            <input
                value={input}
                onChange={event => setInput(event.target.value)}    
            >
            </input>
            <button
                onClick={ handleClick }
            >
                submit
            </button>
        </nav>
    )
}
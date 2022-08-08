import { useState } from "react";
import PostDataService from "../../services/PostDataService";

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
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
        <div>
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
        </div>
    )
}
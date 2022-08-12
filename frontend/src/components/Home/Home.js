import Post from "../Post/Post";
import { useEffect } from "react";
import PostDataService from "../../services/PostDataService"
import testPostPhoto from "../../test_photos/322868_1100-800x825.jpg"
import testProfilePhoto from "../../test_photos/Samoyed-Puppy-Closeup.jpg"

import "./Home.css"

export default function Home(props) {
    return (
        <div id="home">
            { props.posts }
            <button
                onClick={ PostDataService.reset }
            >
                RESET
            </button>
        </div>
    )
}
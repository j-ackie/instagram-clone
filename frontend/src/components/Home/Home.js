import Post from "../Post/Post";
import { useEffect } from "react";
import PostDataService from "../../services/PostDataService"
import testPostPhoto from "../../test_photos/322868_1100-800x825.jpg"
import testProfilePhoto from "../../test_photos/Samoyed-Puppy-Closeup.jpg"

import "./Home.css"

export default function Home(props) {
    useEffect(() => {
        props.getAllPosts();
    }, []);

    return (
        <div id="home">
            {/* <Post 
                username="DogMaster9000"
                profile_image_url={ testProfilePhoto }
                image_url={ testPostPhoto }    
            />
            <Post 
                username="Example Post"
                profile_image_url={ testProfilePhoto }
                image_url={ testPostPhoto }    
            /> */}
            { props.posts }
            <button
                onClick={ PostDataService.reset }
            >
                RESET
            </button>
        </div>
    )
}
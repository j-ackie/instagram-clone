import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function Layout(props) {
    const [posts, setPosts] = useState([]);
    const [event, setEvent] = useState(null);
    
    return (
        <div onClick={ event => setEvent(event) }>
            <Navbar
                event={ event }
                posts={ posts }
                setPosts={ setPosts }
            />
            <Outlet
                context={ {
                    posts: posts,
                    setPosts: setPosts,
                } }
            />
        </div>
    )
}
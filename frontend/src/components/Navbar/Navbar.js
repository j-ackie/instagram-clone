import { useState, useEffect } from "react";

import PostDataService from "../../services/PostDataService";
import postIcon from "../../icons/add.png"
import "./Navbar.css";

import Login from "../Login/Login"

export default function Navbar(props) {
    const handleClick = () => {
        console.log("hey")
        let data = {
            "user_id": null,
            "date": null,
            "likes": [],
            "comments": []
        };
        PostDataService.createPost(data)
            .then(response => {
                console.log("HEYY")
                props.getAllPosts();
            });
    }

    const handlePostIconClick = () => {
        props.setIsPostIconClicked(true);
    } 

    return (
        <nav>
            <h1>Instagram</h1>
            <Login 
                setUser={ props.setUser }
            />
            <h1>
                { props.user }
            </h1>
            <img 
                className="navbar-icons"
                src={ postIcon }
                onClick={ handlePostIconClick }
            />
        </nav>
    )
}
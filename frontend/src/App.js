import { useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import PostDataService from './services/PostDataService';
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar"
import Post from './components/Post/Post';

import "./App.css"

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    PostDataService.getAll()
      .then(response => {
          console.log(response.data)
          let postsList = [];
          for (const post of response.data.posts) {
              console.log(post);
              postsList.push(
                  <Post
                      key={ post._id }
                      postId={ post._id }
                  />
              );
          }
          setPosts(postsList);
      })
      .catch(err => {
          console.log(err);
      });
  }

  return (
    <div className="App">
      <Navbar
        user={ user } 
        setUser={ setUser }
        getAllPosts={ getAllPosts }
      />
      <Home 
        posts={ posts }
        getAllPosts={ getAllPosts }
      />
    </div>
  );
}

export default App;

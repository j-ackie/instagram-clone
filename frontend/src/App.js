import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import PostDataService from './services/post';

import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;

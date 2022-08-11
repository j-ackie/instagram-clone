import { useEffect, useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import Content from "./components/Content/Content"


import "./App.css"

function App() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: ""
    });
    

    return (
        <div className="App">
            <Content 
                userInfo={ userInfo }
                setUserInfo={ setUserInfo }
            />
        </div>
    );
}

export default App;

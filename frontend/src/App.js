import { useState } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import Content from "./components/Content/Content"


import "./App.css"

function App() {
    const [user, setUser] = useState(null);
    
    return (
        <div className="App">
            <Content 
                user={ user }
                setUser={ setUser }
            />
        </div>
    );
}

export default App;

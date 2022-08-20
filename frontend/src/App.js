import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Navigate, Switch, Route, Link } from "react-router-dom";
import Content from "./components/Content/Content";
import LoginPage from './components/LoginRegisterPage/LoginPage';
import RegisterPage from './components/LoginRegisterPage/RegisterPage';

import "./App.css"

function App() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: "",
        profile_picture: ""
    });

    const isLoggedIn = () => {
        return userInfo.userId !== "";
    };
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ 
                    isLoggedIn()
                        ? <Content userInfo={ userInfo } setUserInfo={ setUserInfo } /> 
                        : <Navigate to="/login" />
                } />
                <Route path="/login" element={ <LoginPage setUserInfo={ setUserInfo } /> } />
                <Route path="/register" element={ <RegisterPage setUserInfo={ setUserInfo } /> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

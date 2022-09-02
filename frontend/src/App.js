import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Navigate, Switch, Route, Link, useNavigate } from "react-router-dom";
import { UserProvider } from './UserProvider';
import Layout from './components/Layout/Layout';
import Content from "./components/Content/Content";
import ExtendedPost from './components/Post/ExtendedPost';
import Profile from './components/Profile/Profile';
import LoginPage from './components/LoginRegisterPage/LoginPage';
import RegisterPage from './components/LoginRegisterPage/RegisterPage';

import "./App.css"

export const UserContext = createContext();

function App() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });

    const localUserInfo = localStorage.getItem("userInfo");
    if (localUserInfo && !userInfo.userId) {
        setUserInfo(JSON.parse(localUserInfo));
    }

    return (
        <UserProvider userInfo={ userInfo }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout setUserInfo={ setUserInfo }/>}>
                        <Route index element={ 
                            userInfo.userId !== ""
                                ? <Content /> 
                                : <Navigate to="/login" />
                        }/>
                        <Route path="post/:postId" element={ <ExtendedPost /> } />
                        <Route path="user/:username" element={ <Profile /> } />
                    </Route>
                    <Route path="/login" element={ <LoginPage setUserInfo={ setUserInfo } /> } />
                    <Route path="/register" element={ <RegisterPage setUserInfo={ setUserInfo } /> } />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

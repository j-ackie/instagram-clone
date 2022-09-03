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
import PostDataService from './services/PostDataService';

export const UserContext = createContext();

function App() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        PostDataService.checkLogin()
            .then(response => {
                setLoading(false);
                if (response.data.loggedIn) {
                    setUserInfo(response.data.userInfo);
                }
            })
    }, []);

    // const localUserInfo = localStorage.getItem("userInfo");
    // if (localUserInfo && !userInfo.userId) {
    //     setUserInfo(JSON.parse(localUserInfo));
    // }

    return (
        <UserProvider userInfo={ userInfo }>
            <Routes>
                <Route path="/" element={
                    !loading
                        ? <Layout setUserInfo={ setUserInfo }/>
                        : ""
                }>
                    <Route index element={ 
                        loading
                            ? <RegisterPage />
                            : userInfo.userId !== ""
                                ? <Content /> 
                                : <Navigate to="/login" />
                    }/>
                    <Route path="post/:postId" element={ <ExtendedPost /> } />
                    <Route path="user/:username" element={ <Profile /> } />
                </Route>
                <Route path="/login" element={ <LoginPage setUserInfo={ setUserInfo } /> } />
                <Route path="/register" element={ <RegisterPage setUserInfo={ setUserInfo } /> } />
            </Routes>
        </UserProvider>
    );
}

export default App;

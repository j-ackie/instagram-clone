import { useEffect, useState, createContext } from 'react';
import { Routes, Navigate, Route } from "react-router-dom";
import { UserProvider } from './UserProvider';
import Layout from './components/Layout/Layout';
import Content from "./components/Content/Content";
import ExtendedPost from './components/Post/ExtendedPost';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import LoginPage from './components/LoginRegisterPage/LoginPage';
import RegisterPage from './components/LoginRegisterPage/RegisterPage';
import NotFound from './components/NotFound/NotFound';
import defaultProfilePicture from "./defaultProfilePicture.png";
import AuthDataService from './services/AuthDataService';
import { setAuthHeader } from './http-common';
import "./App.css"

export const UserContext = createContext();

function App() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setAuthHeader();
        AuthDataService.getLogin()
            .then(response => {
                if (response.data.loggedIn) {
                    if (!response.data.userInfo.profilePicture) {
                        response.data.userInfo.profilePicture = defaultProfilePicture;
                    }
                    setUserInfo(response.data.userInfo);
                }
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return;
    }

    return (
        <UserProvider userInfo={ [userInfo, setUserInfo] }>
            <Routes>
                <Route path="/" element={ <Layout /> }>
                    <Route index element={ 
                        userInfo.userId !== ""
                            ? <Content /> 
                            : <Navigate to="/login" />
                    }/>
                    <Route path="post/:postId" element={ <ExtendedPost /> } />
                    <Route path="user/:username" element={ <Profile /> } />
                    <Route path="settings" element={ <Settings /> } />
                    <Route path="*" element={ <NotFound /> } />
                </Route>
                <Route path="/login" element={ <LoginPage setUserInfo={ setUserInfo } /> } />
                <Route path="/register" element={ <RegisterPage setUserInfo={ setUserInfo } /> } />
            </Routes>
        </UserProvider>
        
    );
}

export default App;

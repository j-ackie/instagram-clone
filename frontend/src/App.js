import { useEffect, useState, createContext } from 'react';
import { Routes, Navigate, Route, useLocation, useNavigate } from "react-router-dom";
import { UserProvider } from './UserProvider';
import Layout from './components/Layout/Layout';
import Content from "./components/Content/Content";
import ExtendedPost from './components/Post/ExtendedPost';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import LoginPage from './components/LoginRegisterPage/LoginPage';
import RegisterPage from './components/LoginRegisterPage/RegisterPage';

import "./App.css"
import PostDataService from './services/PostDataService';
import DefaultProfilePicture from "./icons/DefaultProfilePicture.png";
import UserDataService from './services/UserDataService';

export const UserContext = createContext();

function App() {
    const [userInfo, setUserInfo] = useState({
        userId: "",
        username: "",
        profilePicture: "",
        bio: ""
    });
    const [loading, setLoading] = useState(true);

    const location = useLocation();

    useEffect(() => {
        UserDataService.getLogin()
            .then(response => {
                console.log(response.data)
                setLoading(false);
                if (response.data.loggedIn) {
                    if (!response.data.userInfo.profilePicture) {
                        response.data.userInfo.profilePicture = DefaultProfilePicture;
                    }
                    setUserInfo(response.data.userInfo);
                }
            });
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <UserProvider userInfo={ [userInfo, setUserInfo] }>
            <Routes>
                <Route path="/" element={
                    !loading
                        ? <Layout setUserInfo={ setUserInfo }/>
                        : <div>hey</div>
                }>
                    <Route index element={ 
                        userInfo.userId !== ""
                            ? <Content /> 
                            : <Navigate to="/login" />
                    }/>
                    <Route path="post/:postId" element={ <ExtendedPost /> } />
                    <Route path="user/:username" element={ <Profile /> } />
                    <Route path="settings">
                        <Route path="edit" element={ <Settings /> } />
                        <Route path="activity" />
                    </Route>
                </Route>
                <Route path="/login" element={ <LoginPage setUserInfo={ setUserInfo } /> } />
                <Route path="/register" element={ <RegisterPage setUserInfo={ setUserInfo } /> } />
            </Routes>
        </UserProvider>
        
    );
}

export default App;

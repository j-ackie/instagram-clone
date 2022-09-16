import { useEffect, useState, createContext } from 'react';
import { Routes, Navigate, Route, useLocation } from "react-router-dom";
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
import UserDataService from './services/UserDataService';
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

    const location = useLocation();

    useEffect(() => {
        UserDataService.getLogin()
            .then(response => {
                if (response.data.loggedIn) {
                    console.log("yes")
                    if (!response.data.userInfo.profilePicture) {
                        response.data.userInfo.profilePicture = defaultProfilePicture;
                    }
                    setUserInfo(response.data.userInfo);
                }
                setIsLoading(false);
            });
    }, []);

    console.log(userInfo.userId !== "")

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <UserProvider userInfo={ [userInfo, setUserInfo] }>
            <Routes>
                <Route path="/" element={
                    !isLoading
                        ? <Layout />
                        : ""
                }>
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

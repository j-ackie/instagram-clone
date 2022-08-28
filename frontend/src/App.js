import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Navigate, Switch, Route, Link } from "react-router-dom";
import { UserProvider } from './UserProvider';
import Layout from './components/Layout/Layout';
import Content from "./components/Content/Content";
import ExtendedPost from './components/Post/ExtendedPost';
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

    const isLoggedIn = () => {
        return userInfo.userId !== "";
    };
    
    return (
        <UserProvider userInfo={ userInfo }>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout/>}>
                        <Route index element={ 
                            isLoggedIn()
                                ? <Content userInfo={ userInfo } setUserInfo={ setUserInfo } /> 
                                : <Navigate to="/login" />
                        }/>
                        <Route path="post/:postId" element={ <ExtendedPost userInfo={ userInfo }/> } />
                        <Route path="user" />
                    </Route>
                    <Route path="/login" element={ <LoginPage setUserInfo={ setUserInfo } /> } />
                    <Route path="/register" element={ <RegisterPage setUserInfo={ setUserInfo } /> } />
                </Routes>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;

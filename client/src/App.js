import './App.css';
import HomePage from "./pages/Home/HomePage";
import React from 'react'
import Dashboard from "./pages/dashboard/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import BoardsPage from "./pages/Boards/BoardsPage";

import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import ProtectedRoute from "./utils/ProtectedRoute";
import {loadUser} from "./redux/auth/authSlice";
import FreeRoute from "./utils/FreeRoute";

function App() {
    const {user} = useSelector((state => state.auth))
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadUser())
    }, [user])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<FreeRoute/>}>
                    <Route exact path="/login" element={<Login/>}/>
                    <Route exact path="/register" element={<Register/>}/>
                </Route>
                <Route exact path="/" element={<Dashboard/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/boards" element={<BoardsPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

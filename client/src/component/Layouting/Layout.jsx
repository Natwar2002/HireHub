import { Outlet } from "react-router-dom";
import NavBar from '../NavigationBar/NavBar';

function MainLayout () {

    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
}

export default MainLayout;
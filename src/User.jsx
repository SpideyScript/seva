
import React from 'react';
import './style.css';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';


const User = () => {
    return (
        <>
        <Navbar/>
        <div id="page-customer-dashboard" className="page">
            <div className="sidebar-layout">
                <Sidebar />
                <div className="main-content">
                 
                      <Outlet />
                 
                </div>
            </div>
        </div>
        </>
    )
}

export default User

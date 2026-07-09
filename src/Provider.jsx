
import React from 'react';
import './style.css';
import { Outlet } from 'react-router-dom';
import ProviderSidebar from './components/Provider-sidebar';
import Navbar from './components/Navbar';

const Provider = () => {
    return (
        <>
        <Navbar/>
        <div id="page-customer-dashboard" className="page">
            <div className="sidebar-layout">
                <ProviderSidebar />
                <div className="main-content">
                 
                      <Outlet />
                 
                </div>
            </div>
        </div>
        </>
    )
}

export default Provider

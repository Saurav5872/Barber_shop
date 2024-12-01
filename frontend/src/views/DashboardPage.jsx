import React from 'react';
import UserDashboard from '../components/UserDashboard';
import Header from '../components/Header';
import Footer from '../components/Footer';

const DashboardPage = () => {
    return (
        <>
            <Header />
            <UserDashboard />
            <Footer/>
        </>
    )
}

export default DashboardPage;
import React from 'react';
import Header from '../components/Header';
import Welcome from '../components/Welcome';
import Footer from '../components/Footer';
import Services from '../components/Services'




const HomePage = () => {
    return (
        <>
            <Header/>
            <Welcome/>
            <Services/>
            <Footer/>
        </>
    )
}

export default HomePage;
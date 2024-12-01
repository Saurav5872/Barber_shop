import React from 'react';
import {Navbar, Col, Row, Image } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import '../styles/Footer.css';

const Footer = () => {
//Declarations
const ticTokIconPath = '/images/tiktok_icon.png';
const facebookIconPath = '/images/facebook_icon.png';
const snapchatIconPath = '/images/snapchat_icon.png';
const twitterIconPath = '/images/twitter_icon.png';
const instagramIconPath = '/images/instagram_icon.png';
//Functions and Handlers

    return (
        
        <Navbar className='footer-container'>
            
            <Col className='footer-title-col col-4'>
                <Row className='footer-title-row'>
                    <Col className='footer-title-sub-col col-8'>
                        <h4>Edward ScissorHands</h4>
                        <h5>Barber Shop</h5>
                    </Col>
                    <Col className='footer-logo-col col-4'>
                        <img src='/images/barber_shop_logo.png' alt="logo"  className='footer-logo'/>
                    </Col>
                </Row>
            </Col>
            <Col className='footer-location-col col-3'>
                <h5 id='footer-location-col-h5'>Location</h5>
                <p className='footer-location-p'>47th St.</p>
                <p className='footer-location-p'>Denver, Colorado, 80532</p>
                <p className='footer-location-p'>(746)-343-4566</p>
            </Col>
            <Col className='footer-socials-col col-4'>
                <Col className='footer-social-icon-col'>
                    <Image src={facebookIconPath} rounded className='footer-social-icon' />
                    <p>Facebook</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={instagramIconPath} rounded className='footer-social-icon'/>
                    <p>Instagram</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={twitterIconPath} rounded className='footer-social-icon'/>
                    <p>Twitter</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={snapchatIconPath} rounded className='footer-social-icon'/>
                    <p>Snapchat</p>
                </Col>
                <Col className='footer-social-icon-col'>
                    <Image src={ticTokIconPath} rounded className='footer-social-icon'/>
                    <p>TikTok</p>
                </Col>
            </Col>
        </Navbar>
    ) 
}

export default Footer;
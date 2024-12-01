import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Nav, Navbar, NavDropdown, Col, Container } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import '../styles/Header.css';
import axios from 'axios';
import {useUser} from '../components/UserContext';


const Header = () => {
    //Declarations 
    const navigate= useNavigate();
    const { loginUserId, setLoginUserId } = useUser();


    //Handlers and functions
    const logoutHandler = async () => {
        try {
            await axios.post('http://localhost:5000/api/user/logout');
            setLoginUserId(null); // Clear loginUserId in the context
            console.log('frontend and logout button passed without issue');
            navigate('/login');
        } catch (error) {
            console.log('Error logging out:', error);
        }
    };

    const redirectToProfile = () => {
        if (loginUserId) {
            navigate(`/profile/${loginUserId}`);
        } else {
          // Handle case where loginUserId is not available (not logged in)
            console.log('User not logged in');
        };
    };

    const redirectBookAppointment  = () => {
        if(loginUserId){
            navigate(`/appointment/${loginUserId}/book`)
        } else{
            console.log('User not logged in')
        };
    };

    return (
        <Navbar  className='navbar'  variant='dark' expand='lg' collapseOnSelect style={{backgroundColor: '#7C2B2B'}}>

                    <LinkContainer to='/'>
                        <Navbar.Brand className='d-flex'>
                            <Col className='logo-col'>
                                <img src='/images/barber_shop_logo.png' alt="logo"  className='logo'/>
                            </Col>
                            <Col className='store-name'>
                                <h4>Edward ScissorHands</h4>
                                <h4>Barber Shop</h4> 
                            </Col>
                        </Navbar.Brand>
                    </LinkContainer>
                
                    {/* conditional rendering for appointments button in header */}
                    {loginUserId === null ? (
                        //if not logged in show nothing
                        <></>
                    ) : (
                        //if logged in show appointments button
                        <LinkContainer to={`/appointment/${loginUserId}/book`}>
                            <Nav.Link className='nav-btn'>Appointments</Nav.Link>
                        </LinkContainer>
                    )}

                <LinkContainer to='/services'>
                    <Nav.Link className='nav-btn'>Services</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/contactUs'>
                    <Nav.Link className='nav-btn'>Contact Us</Nav.Link>
                </LinkContainer>

                <LinkContainer to='/aboutUs'>
                    <Nav.Link className='nav-btn'>About Us</Nav.Link>
                </LinkContainer>

                {/* conditional rendering for login and user dropdown */}
                {loginUserId === null ? (
                    // show login button if id is null
                    <LinkContainer to='/login'>
                        <Nav.Link className='nav-btn'>Login</Nav.Link>
                    </LinkContainer>
                ) : (
                    // if logged in show profile button with routes to dashboard and logout
                    <NavDropdown title="Profile" id="basic-nav-dropdown" className='nav-btn ml-5'>
                        <NavDropdown.Item onClick={redirectToProfile}> User Dashboard</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                )}
        </Navbar>
    )
}

export default Header
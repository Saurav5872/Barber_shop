import React from 'react';
import {Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import '../styles/Welcome.css';
import {useUser} from '../components/UserContext';

const Welcome = () => {
    //Declarations
    const { loginUserId } = useUser();

    return (
        <>
            <Row className='row-1'>
                <p className='welcome-p'>
                    Your only as good as your last Haircut
                    <p className='welcome-p'>Edward ScissorHands</p>
                    {loginUserId === null ? (
                        <Link to='/login'><button className='welcome-btn'>Login</button></Link>
                    ) : (
                        <Link to={`/appointment/${loginUserId}/book`}><button className='welcome-btn'>Book Now!</button></Link>
                    )}
                </p>
            </Row>
        </>
    )
}

export default Welcome;
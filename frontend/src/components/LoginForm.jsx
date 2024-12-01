import FormContainer from './FormContainer';
import { Form, Row, Col, } from 'react-bootstrap';
import React, {useState} from 'react';
import {useNavigate , Link} from 'react-router-dom';
import '../styles/Login.css';
import axios from 'axios';
import { useUser } from './UserContext';



export const LoginForm = () => {
    //Declarations
    const {setLoginUserId} = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword]= useState('');
    const navigate = useNavigate();
    const [errors,setErrors]=useState([])

    //Handlers and Functions
    const loginHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/user/login', { email, password }, { withCredentials: true })
            .then(res => {
                const userToLogin = {
                    userId: res.data.userId,
                };
                setLoginUserId(res.data.userId);
                navigate(`/profile/${userToLogin.userId}`);
            })
            .catch(error => {
                console.log('error with login:', error);
                // Update the state with the error messages
                const errorMessage = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
                const errorArray = Array.isArray(errorMessage) ? errorMessage : [errorMessage];
                setErrors(errorArray);
                console.log(errorMessage);
            });
    }

    return (
        <Row className='login-container'>
            <Col className='login-left-col'></Col>
            <Col className='login-col col-8'>
                <FormContainer>
                <h1 className='login-h1'>Sign In</h1>
                    <Form onSubmit={loginHandler}>
                        {/* check for validation error and display them */}
                        <div style={{color:"red"}}>
                            {
                                errors.map((err,idx)=>{
                                    return(
                                        <p key={idx}>{err}</p>
                                    )
                                })
                            }
                        </div>
                        <Form.Group controlId='email' className='my-3'>
                            <Form.Label className='login-form-label' >Email</Form.Label>
                                <Form.Control
                                    className='login-form-inputs shadow-none'
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email} 
                                    onChange={(e)=>setEmail(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className='my-3'>
                            <Form.Label className='login-form-label'>Password</Form.Label>
                                <Form.Control
                                    className='login-form-inputs shadow-none border-none'
                                    type='password' 
                                    placeholder='Enter Password' 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <button className='login-btn' type='submit' > Sign In </button>
                    </Form>
                    <Row className='py-3'>
                        <Col >
                            <div className='login-register'>
                                <p className='login-p'>
                                    New Customer? <Link to={'/register'} className='login-link'>Register Here</Link>
                                </p>
                                <p className='login-p'>
                                    Continue as guest? <Link to={'/'} className='login-link'>Homepage</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </FormContainer>
            </Col>
        </Row>
    )
}

export default LoginForm;
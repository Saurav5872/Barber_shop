import React, {useState} from 'react';
import FormContainer from './FormContainer';
import { Form, Button, Row, Col } from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';
import { useUser } from './UserContext';


const RegisterForm = () => {

    //Declarations and State Management 
    const [fullName,setFullName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const {setLoginUserId} = useUser();
    const [errors,setErrors]=useState([])

    //Handlers and Functions
    const registerHandler =  async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/users/register`, {fullName, email,password, confirmPassword})
                .then(res => {
                    console.log(res.data);
                    setFullName('');
                    setEmail('');
                    setPassword('');
                setConfirmPassword('');
                navigate('/');
                });
        } catch (error) {
            console.log(error.response.data)
            const errorArray=[]
            for (const key of Object.keys(error.response.data.errors)){
                errorArray.push(error.response.data.errors[key].message)
            }
            setErrors(errorArray);
        }
    };

    return (
        <Row className='register-container'>
            <Col className='register-col col-8'>
                <FormContainer>
                <h1 className='register-h1'>Register</h1>
                    <Form onSubmit={registerHandler}>
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
                        <Form.Group controlId='fullName' className='my-3'>
                            <Form.Label className='register-form-label' >Full Name</Form.Label>
                                <Form.Control
                                    className='register-form-inputs shadow-none'
                                    type='text' 
                                    placeholder='Enter First Name' 
                                    value={fullName} 
                                    onChange={(e)=>setFullName(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='email' className='my-3'>
                            <Form.Label className='register-form-label' >Email</Form.Label>
                                <Form.Control
                                    className='register-form-inputs shadow-none'
                                    type='email' 
                                    placeholder='Enter Email' 
                                    value={email}  
                                    onChange={(e)=>setEmail(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='password' className='my-3'>
                            <Form.Label className='register-form-label'>Password</Form.Label>
                                <Form.Control
                                    className='register-form-inputs shadow-none'
                                    type='password' 
                                    placeholder='Enter Password' 
                                    value={password} 
                                    onChange={(e)=>setPassword(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='confirmPassword' className='my-3'>
                            <Form.Label className='register-form-label'> Confirm Password</Form.Label>
                                <Form.Control
                                    className='register-form-inputs shadow-none'
                                    type='password' 
                                    placeholder='Confirm Password' 
                                    value={confirmPassword} 
                                    onChange={(e)=>setConfirmPassword(e.target.value)}>
                                </Form.Control>
                        </Form.Group>
                        <button className='register-btn' type='submit'> Register </button>
                    </Form>
                    <Row className='py-3'>
                        <Col >
                            <div className='register-login'>
                                <p className='register-p'>
                                    Already A Customer? <Link to={'/login'} className='register-link'>Login</Link>
                                </p>
                                <p className='register-p'>
                                    Continue as guest? <Link to={'/'} className='register-link'>Homepage</Link>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </FormContainer> 
            </Col>
            <Col className='register-right-col'></Col>
        </Row>
    )
}

export default RegisterForm;
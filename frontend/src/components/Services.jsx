import React, {useState, useEffect} from 'react';
import {Card, Button, Col, Row, Container} from 'react-bootstrap';
import {useUser} from '../components/UserContext';
import axios from 'axios';
import '../styles/Services.css';
import {Link} from 'react-router-dom';

const Services = () => {
    const { loginUserId } = useUser();
    const [allServices, setAllServices] = useState([]);
    const [mensHaircuts, setMensHaircuts] = useState([]);
    const [kidsHaircuts, setKidsHaircuts] = useState([]);
    const [womensHaircuts, setWomensHaircuts] = useState([])


    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await axios.get('http://localhost:5000/api/services/all');
                console.log('get all services value: ', response.data);
                setAllServices(response.data);
            } catch (error){
                console.error('Error fetching service data: ', error.message);
            }
        }
        fetchData();
    }, [])

//run separate useEffect for each filter to prevent infinite loop in console.
    useEffect(() => {
        setMensHaircuts(allServices.filter(service => service.forMen));
    }, [allServices]);
    
    useEffect(() => {
        setWomensHaircuts(allServices.filter(service => service.forWomen));
    }, [allServices]);
    
    useEffect(() => {
        setKidsHaircuts(allServices.filter(service => service.forKids));
    }, [allServices]);

    return (
        <Container id='service-container'>
                <Row id='service-title-container'>
                    <h1 id='service-title-h1'>Our Services</h1>
                </Row>
                <Row>
                    <h3 className='service-category-titles-h3'>Mens</h3>
                    <Col className='service-card-container-col'>
                    {mensHaircuts.map((service, index)=>{
                        return(
                            <Card key={index} className='service-cards'>
                                <Card.Body>
                                    <Card.Title className='service-title'>{service.title}</Card.Title>
                                    <Card.Subtitle>
                                        <div className='service-subtitle'>
                                            <p className='service-p'>{service.duration} min</p>
                                            <p className='service-p'>${service.price}</p>
                                        </div>
                                    </Card.Subtitle>
                                    <Card.Text>{service.description}</Card.Text>
                                </Card.Body>
                                {/* Add the button here */}
                                <div className="d-flex justify-content-center mt-auto"> {/* Use mt-auto to push the button to the bottom */}
                                    {/* conditional rendering for appointments button */}
                                    {loginUserId === null ? (
                                        //if not logged in show nothing
                                        <Link to='/login'><button id='service-booking-btn'>Login to Book!</button></Link>
                                    ) : (
                                        //if logged in show appointments button
                                        <Link to={`/appointment/${loginUserId}/book`}><button id='service-booking-btn'>Book Now!</button></Link>
                                    )}
                                </div>
                            </Card>
                        )
                    })}
                    </Col>
                </Row>
                <Row>
                    <h3 className='service-category-titles-h3'>Women's</h3>
                    <Col className='service-card-container-col'>
                    {womensHaircuts.map((service, index)=>{
                        return(

                            <Card key={index} className='service-cards'>
                                <Card.Body>
                                    <Card.Title className='service-title'>{service.title}</Card.Title>
                                    <Card.Subtitle>
                                        <div className='service-subtitle'>
                                            <p className='service-p'>{service.duration} min</p>
                                            <p className='service-p'>${service.price}</p>
                                        </div>
                                    </Card.Subtitle>
                                    <Card.Text>{service.description}</Card.Text>
                                </Card.Body>
                                {/* Add the button here */}
                                <div className="d-flex justify-content-center mt-auto"> {/* Use mt-auto to push the button to the bottom */}
                                    {/* conditional rendering for appointments button */}
                                    {loginUserId === null ? (
                                        //if not logged in show nothing
                                        <Link to='/login'><button id='service-booking-btn'>Login to Book!</button></Link>
                                    ) : (
                                        //if logged in show appointments button
                                        <Link to={`/appointment/${loginUserId}/book`}><button id='service-booking-btn'>Book Now!</button></Link>
                                    )}
                                </div>
                            </Card>
                        )
                    })}
                    </Col>
                </Row>
                <Row>
                    <h3 className='service-category-titles-h3'>Kids</h3>
                    <Col className='service-card-container-col'>
                    {kidsHaircuts.map((service, index)=>{
                        return(
                            <Card key={index} className='service-cards'>
                                <Card.Body>
                                    <Card.Title className='service-title'>{service.title}</Card.Title>
                                    <Card.Subtitle>
                                        <div className='service-subtitle'>
                                            <p className='service-p'>{service.duration} min</p>
                                            <p className='service-p'>${service.price}</p>
                                        </div>
                                    </Card.Subtitle>
                                    <Card.Text>{service.description}</Card.Text>
                                </Card.Body>
                                {/* Add the button here */}
                                <div className="d-flex justify-content-center mt-auto"> {/* Use mt-auto to push the button to the bottom */}
                                    {/* conditional rendering for appointments button */}
                                    {loginUserId === null ? (
                                        //if not logged in show nothing
                                        <Link to='/login' ><button id='service-booking-btn'>Login to Book!</button></Link>
                                    ) : (
                                        //if logged in show appointments button
                                        <Link to={`/appointment/${loginUserId}/book`}><button id='service-booking-btn'>Book Now!</button></Link>
                                    )}
                                </div>
                            </Card>
                        )
                    })}
                    </Col>
                </Row>
                
        </Container>
    )
}

export default Services;
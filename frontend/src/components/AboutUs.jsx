import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import '../styles/AboutUs.css';

const AboutUs = () => {
    //Declarations
    const imagePath = '/images/barber_shop_logo.png';
    return (
            <Row className='about-container'>
                <Col className='  col-7 d-flex flex-column'>
                        <div className='about-content d-flex '>
                            <h1 className='title-h1'>About Us</h1>
                        </div>
                        <Col className='about-content'>
                            <p className='about-p'>
                                Welcome to Virtual Barber Shop, where craftsmanship meets style in every snip and clip. 
                                Nestled in the heart of Denver, our dedicated team of skilled barbers brings artistry to the craft of hair grooming.
                            </p>
                            <p className='about-p'>
                                At Virtual Barber Shop, we believe in the transformative power of a great haircut. 
                                Our experienced barbers are not just experts with scissors; they are architects of personal style, 
                                sculpting hair with precision to enhance your unique features. Whether you're seeking a classic cut, 
                                a modern fade, or a bold new look, we've got you covered.
                            </p>
                            <p className='about-p'>
                                Step into our modern and welcoming space, where the ambiance is as inviting as the service. 
                                We pride ourselves on creating an atmosphere where clients can relax, unwind, and leave feeling 
                                confident in their refreshed appearance. Our commitment to customer satisfaction is as sharp as our shears.
                            </p>
                            <p className='about-p'>
                                Beyond haircuts, Virtual Barber Shop offers a range of grooming services, 
                                including beard trims and hot towel shaves. We're not just a barbershop; we're a destination
                                for those who appreciate the artistry of grooming.
                            </p>
                            <p className='about-p'>
                                Join us at Virtual Barber Shop, where every visit is an opportunity to experience 
                                the blend of tradition and innovation in the world of men's grooming. Your style journey begins here.
                            </p>
                        </Col>
                </Col>
                <Col className='col-5  image-col'>
                    <Image src={imagePath}  alt='About Us Logo'roundedCircle className="about-image"></Image>
                </Col>
            </Row>
    )
}

export default AboutUs;
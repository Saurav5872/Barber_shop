import { React, useMemo } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import "../styles/ContactUs.css";

const ContactUs = () => {
  const facebookIconPath = "/images/facebook_icon.png";
  const snapchatIconPath = "/images/snapchat_icon.png";
  const twitterIconPath = "/images/twitter_icon.png";
  const instagramIconPath = "/images/instagram_icon.png";

  //google maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCzejn_6H7wIXc2P4Vi7aop8ExL34qAX7o",
  });

  const center = useMemo(() => ({ lat: 39.7358, lng: -104.9899 }), []);

  const onLoad = (marker) => {
    console.log("marker", marker);
  };

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Row className="contactUs-row">
        <h1 className="contactUs-header-h3">Contact Us</h1>
      </Row>
      <Row className="contactUs-location-row">
        <Col className="contactUs-col">
          <h5 id="contactUs-location-h5">Location</h5>
          <p className="contactUs-location-p">1226 Bannock St.</p>
          <p className="contactUs-location-p">Denver, Colorado 80204</p>
          <p className="contactUs-location-p">(123)-456-7890</p>
        </Col>
        <Col className="contactUs-col">
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "70%", height: "100%" }}
          >
            <MarkerF position={center} onLoad={onLoad} />
          </GoogleMap>
        </Col>
      </Row>
      <Row className="contactUs-socials-row">
        <Col className="footer-social-icon-col">
          <Image
            src={facebookIconPath}
            rounded
            className="footer-social-icon"
          />
          <p>Facebook</p>
        </Col>
        <Col className="footer-social-icon-col">
          <Image
            src={instagramIconPath}
            rounded
            className="footer-social-icon"
          />
          <p>Instagram</p>
        </Col>
        <Col className="footer-social-icon-col">
          <Image src={twitterIconPath} rounded className="footer-social-icon" />
          <p>Twitter</p>
        </Col>
        <Col className="footer-social-icon-col">
          <Image
            src={snapchatIconPath}
            rounded
            className="footer-social-icon"
          />
          <p>Snapchat</p>
        </Col>
      </Row>
    </>
  );
};

export default ContactUs;

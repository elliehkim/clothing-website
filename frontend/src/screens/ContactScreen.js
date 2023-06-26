import React, { useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import Message from '../components/Message'

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  const data = {
    name: name,
    email: email,
    message: message
  }  

  axios.post('api/users/contact/', data)
    .then(response => {
      setResponseMessage(response.data.message);
    })
    .catch(error => {
      console.error(error);
    });


  setName('');
  setEmail('');
  setMessage('');
};

return (
  <Container>
    <Row className='py-4'>
    {responseMessage && <Message variant='info'>{responseMessage}</Message>}

    <h1>Contact Us</h1>
    <div className="contact-container py-4">
      <form className="contact-form">
        <div>

          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Your Name"
            required
          />
        </div>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your Email"
            required
          />
        </div>
        <div>
          <textarea
            id="message"
            value={message}
            onChange={handleMessageChange}
            placeholder="Your Message"
            required
          />
        </div>

        <Button
          type="button"
          className="btn-block col-12"
          onClick={handleSubmit}>
          Submit Query
        </Button>
      </form>
    </div>
    <Col md={4} style={{ marginTop: "80px", marginLeft: "80px" }}>
      <h3>Our Details</h3>
      <p>1 Wellesley Street West<br></br>
        Auckland Central<br></br>
        1010</p>
      <p>dne@gmail.com</p>
      <p>0800 736353</p>
    </Col>
    <Col md={7} style={{ padding: "60px 0px" }}>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.655452548605!2d174.76198831529135!3d-36.85072697993817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d0d47e5388915ef%3A0x48a613bf09ef0c3f!2sFather%20Ted&#39;s%20Original%20Irish%20Pub!5e0!3m2!1sen!2snz!4v1680995270136!5m2!1sen!2snz" width="600" height="450" style={{ border: "0", borderRadius: "12px" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </Col>
    </Row>
  </Container>
);
};

export default ContactScreen;
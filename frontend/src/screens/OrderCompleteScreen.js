import React from 'react'
import { Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function OrderCompleteScreen() {
  return (
    <Container>
    <div className='d-flex flex-column justify-content-center align-items-center vh-100'>
      <h1>Thank You!</h1>
      <img  style={{
        height:"100px",
        width:"100px",
        marginBottom:"20px",
      }} src={"/images/tick.png"} />
      <p>Your order has been received.</p>
      <Link to='/profile'><Button>Check your order</Button></Link>
    </div>
    <div>
    </div>
    </Container>
  )
}

export default OrderCompleteScreen
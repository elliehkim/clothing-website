import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'


function OrderCompleteScreen() {
  return (
    <Container className='py-4'>
    <div>Order Complete!</div>
    <Link to='/profile'><div>Check your orders</div></Link>
    </Container>
  )
}

export default OrderCompleteScreen
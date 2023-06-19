import React from 'react'
import { Link } from 'react-router-dom'

function OrderCompleteScreen() {
  return (
    <>
    <div>Order Complete!</div>
    <Link to='/profile'><div>Check your orders</div></Link>
    </>
  )
}

export default OrderCompleteScreen
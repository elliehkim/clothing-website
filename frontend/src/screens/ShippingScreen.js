import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { Form, Button} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


function ShippingScreen() {
    const cart = useSelector(state=> state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postcode, setPostcode] = useState(shippingAddress.postcode)
    
    const submitHandler= (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postcode}))
        navigate('/payment')
    }
  return (
   <FormContainer>
        <CheckoutSteps step1/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address' className='mt-3'>
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter address'
                    value={address ? address: ''}
                    onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='city' className='mt-3'>
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter city'
                    value={city ? city: ''}
                    onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='postcode' className='mt-3'>
                <Form.Label>Postcode</Form.Label>
                <Form.Control
                    required
                    type='text'
                    placeholder='Enter postcode'
                    value={postcode ? postcode: ''}
                    onChange={(e)=>setPostcode(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='country' className='mt-3'>
                <Form.Label>Country</Form.Label>
                <Form.Control
                    as = "select"
                    defaultValue='country'>
                        <option value="country">New Zealand</option>
                    </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3 button-block'>
                Continue
            </Button>
            
        </Form>
   </FormContainer>
  )
}

export default ShippingScreen
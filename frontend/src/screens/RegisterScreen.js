import React, { useState, useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const { search } = useLocation()
    const navigate = useNavigate()
    const redirect = search ? search.split('=')[1] : '/'

    const userRegister = useSelector(state=> state.userRegister)
    const { loading, error, userInfo }  = userRegister

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    }, [userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != confirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name,email,password))
        }
    }
  return (
    <FormContainer className='py-3'>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='mt-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='name'
                    placeholder='Enter name'
                    value={name}
                    onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password' className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter Password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                >
                </Form.Control>
            </Form.Group>

            <Button className='mt-3 button-block' type='submit' variant='primary'>Register</Button>
        </Form>

        <Row className='py-3'>
            <Col>
                Have an Account? <Link 
                to ={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Sign In</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen
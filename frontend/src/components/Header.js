import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { logout}from '../actions/userActions'

function Header() {

    const userLogin = useSelector(state=>state.userLogin)
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

  return (
    <header>
         <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to ='/'>
                <Navbar.Brand>D & E</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='m-auto'>
                <LinkContainer to ='/about'>
                <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to ='/men'>
                <Nav.Link>Men</Nav.Link>
                </LinkContainer>
                <LinkContainer to ='/women'>
                <Nav.Link>Women</Nav.Link>
                </LinkContainer>
                <LinkContainer to ='/contact'>
                <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav className="justify-content-end">
                <LinkContainer to ='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
                </LinkContainer>

                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to ='/profile'>
                            <NavDropdown.Item> Profile </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
                    </NavDropdown>
                ):
                <LinkContainer to ='/login'>
                    <Nav.Link><i className='fas fa-user'></i>Login</Nav.Link>
                </LinkContainer>}
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header
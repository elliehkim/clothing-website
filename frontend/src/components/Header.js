import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink } from 'react-router-dom'
import SearchBox from './SearchBox'
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
            <SearchBox />
            <Nav className='m-auto'>
                <LinkContainer to ='/men' className='me-2'>
                <Nav.Link>Men</Nav.Link>
                </LinkContainer>
                <LinkContainer to ='/women' className='me-2'>
                <Nav.Link>Women</Nav.Link>
                </LinkContainer>
            </Nav>
            <Nav>
                <LinkContainer to ='/about' className='me-2'>
                    <Nav.Link>About</Nav.Link>
                </LinkContainer>
                <LinkContainer to ='/contact' className='me-2'>
                    <Nav.Link>Contact</Nav.Link>
                </LinkContainer>
                <LinkContainer to ='/cart'>
                <Nav.Link className='me-2'><i className='fas fa-shopping-cart fa-xl'></i></Nav.Link>
                </LinkContainer>

                {userInfo ? (
                    <NavDropdown title={userInfo.name} id='username' style={{width: "3vw"}}>
                        <LinkContainer to ='/profile'>
                            <NavDropdown.Item> Profile </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}> Logout </NavDropdown.Item>
                    </NavDropdown>
                ):
                <LinkContainer to ='/login'>
                    <Nav.Link><i className='fas fa-user fa-xl'></i></Nav.Link>
                </LinkContainer>}
                
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </header>
  )
}

export default Header
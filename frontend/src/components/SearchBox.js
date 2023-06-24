import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'

function SearchBox() {

    const [keyword, setKeyword] = useState('');

    let navigate = useNavigate()
    let location = useLocation()
    
    const submitHandler = (e) =>{
        e.preventDefault()
        if(keyword){
            navigate(`/search/?keyword=${keyword}`)
            document.getElementById('searchInput').value = "";
        }else{
            navigate(navigate(location.pathname))
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            type='text'
            name='q'
            size='sm'
            id= 'searchInput'
            onChange={(e)=> setKeyword(e.target.value)}
            className='mr-sm-2 me-1'
            style={{width:'50%'}}
            >
        </Form.Control>
        <Button
            type='submit'
            variant='outline-info'
            className='p-1 me-3'>
            Search
        </Button>
    </Form>
  )
}

export default SearchBox
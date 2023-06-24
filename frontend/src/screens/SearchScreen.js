import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useSearchParams } from 'react-router-dom'
import { searchedProducts } from '../actions/productActions'

function SearchScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList

    const [searchParams, setSearchParams] = useSearchParams()
    let keyword = searchParams.get('keyword')

    console.log(keyword)

    useEffect(()=>{
        dispatch(searchedProducts(keyword))

        
    },[dispatch, keyword])
  return (
    <Container className='py-3'>
        {loading ? <Loader />
            : error? <Message variant='danger'>{error}</Message>
            : products && products.length > 0  ? 
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            :
            <div className='d-flex justify-content-center'>
                <p className='mt-4 fs-4'>Not found</p>
            </div>
        }
    </Container>
  )
}

export default SearchScreen
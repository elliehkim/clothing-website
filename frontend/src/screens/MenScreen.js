import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProducts } from '../actions/productActions'


function MenScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList


    useEffect(()=>{
        dispatch(listProducts())

        
    },[dispatch])
  return (
    <Container className='py-4'>
        <Row className='products'>
            <Col md={3} className='left'>
                <div className='filterItem'>
                    <h3>Product Categories</h3>
                    <div className='inputItem'>
                        <input type="checkbox" />
                        <label htmlFor='1'>T-Shirt</label>
                    </div>
                    <div className='inputItem'>
                        <input type="checkbox" />
                        <label htmlFor='1'>Shirt</label>
                    </div>
                    <div className='inputItem'>
                        <input type="checkbox" />
                        <label htmlFor='1'>Pants</label>
                    </div>
                    <div className='inputItem'>
                        <input type="checkbox" />
                        <label htmlFor='1'>Jacket</label>
                    </div>
                </div>
                <div className='filterItem'>
                    <h3>Filter by price</h3>
                    <div className='inputItem'>
                        <span>$0</span>
                        <input type='range' min={0} max={1000} />
                        <span>$1000</span>
                    </div>
                </div>
                <div className='filterItem'>
                    <h3>Sort by</h3>
                    <div className='inputItem'>
                        <input type='radio' id='asc' value='asc' name='price' />
                        <label htmlFor='asc'>Price Lowest First</label>
                        <br />
                        <input type='radio' id='asc' value='asc' name='price' />
                        <label htmlFor='asc'>Price Highest First</label>
                    </div>
                </div>

            </Col>

            <Col md={9}>
                <Row>
                {products.map(product => (
                    <Col key={product._id} md={9} lg={6} xl={4}>
                        <Product product={product} />
                    </Col>
                ))}
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default MenScreen
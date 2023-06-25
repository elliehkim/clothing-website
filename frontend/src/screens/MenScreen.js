import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listFilterProducts } from '../actions/productActions';


function MenScreen() {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error, loading, products} = productList
    const [categories, setCategories] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [sortBy, setSortBy] = useState('');
    const gender = 'men'

    useEffect(() => {
        dispatch(listFilterProducts(gender, categories, minPrice, maxPrice, sortBy));
      }, [dispatch, gender, categories, minPrice, maxPrice, sortBy]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (e.target.checked) {
      setCategories([...categories, selectedCategory]);
    } else {
      setCategories(categories.filter((category) => category !== selectedCategory));
    }
  };
  

  return (
    <Container className='py-4'>
        <Row className='products'>
            <Col md={3} className='left'>
                <div className='filterItem'>
                    <h3>Product Categories</h3>
                    <div className='inputItem'>
                        <input 
                            type="checkbox" 
                            id='1'
                            value="T-Shirt"
                            onChange={handleCategoryChange} />
                        <label htmlFor='1'>T-Shirt</label>
                    </div>
                    <div className='inputItem'>
                        <input 
                            type="checkbox" 
                            id='2'
                            value="Shirt"
                            onChange={handleCategoryChange} />
                        <label htmlFor='2'>Shirt</label>
                    </div>
                    <div className='inputItem'>
                        <input
                            type="checkbox"
                            id="3"
                            value="Pants"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor='3'>Pants</label>
                    </div>
                    <div className='inputItem'>
                        <input
                            type="checkbox"
                            id="4"
                            value="Jacket"
                            onChange={handleCategoryChange}
                        />
                        <label htmlFor='4'>Jacket</label>
                    </div>
                </div>
                <div className="filterItem">
                    <h3>Filter by price</h3>
                    <div className='inputItem'>
                    <label htmlFor='minPrice'>Min Price: $</label>
                    <input
                        style={{
                            width:'100px',
                            marginLeft:'5px',
                        }}
                        type='number'
                        id='minPrice'
                        value={minPrice}
                        onChange={e => setMinPrice(e.target.value)}
                    />
                    </div>
                    <div className='inputItem'>
                    <label htmlFor='maxPrice'>Max Price: $</label>
                    <input
                        style={{
                            width:'100px',
                            marginLeft:'5px',
                        }}
                        type='number'
                        id='maxPrice'
                        value={maxPrice}
                        onChange={e => setMaxPrice(e.target.value)}
                    />
                    </div>
                </div>
                <div className="filterItem">
                    <h3>Sort by</h3>
                    <div className="inputItem">
                        <input
                        type="radio"
                        id="sortLowest"
                        value="lowest"
                        name="sort"
                        checked={sortBy === 'lowest'}
                        onChange={(e) =>
                            setSortBy(e.target.value)}
                        />
                        <label htmlFor="sortLowest">Price: Lowest First</label>
                    </div>
                    <div className="inputItem">
                        <input
                        type="radio"
                        id="sortHighest"
                        value="highest"
                        name="sort"
                        checked={sortBy === 'highest'}
                        onChange={(e) =>
                            setSortBy(e.target.value)}
                        />
                        <label htmlFor="sortHighest">Price: Highest First</label>
                    </div>
                    <div className="inputItem">
                        <input
                        type="radio"
                        id="sortNewest"
                        value="newest"
                        name="sort"
                        checked={sortBy === 'newest'}
                        onChange={(e) =>
                            setSortBy(e.target.value)}
                        />
                        <label htmlFor="sortNewest">Newest</label>
                    </div>
                </div>


            </Col>

            <Col md={9}>
                <Row>
                {(
                    products.map((product) => (
                        <Col key={product._id} md={9} lg={6} xl={4}>
                        <Product product={product} />
                        </Col>
                    ))
                )}
                </Row>
            </Col>
        </Row>
    </Container>
  )
}

export default MenScreen
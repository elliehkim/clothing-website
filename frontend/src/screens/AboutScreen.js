import React from 'react'
import { Row, Col, Image, Container } from 'react-bootstrap'

function AboutScreen() {
  return (
    <Container className='py-4'>
    <Row>
      <h1>About Us</h1>

      <Col md={3}>
        <Image src={"/images/logo.png"} alt="logo" fluid rounded />
      </Col>
        
      <Col md={9} >
      <p style={{padding: "60px"}}>At David and Ellie Productions, we believe that fashion is so much more than just clothes—it's a powerful means of self-expression and a reflection of our values. We are not just a clothing retailer; we are a community-driven brand committed to promoting values that resonate with our customers. Join us on a journey where style meets purpose and fashion becomes a force for positive change.</p>
      </Col>


      <hr style={{margin: "50px 200px 50px 0px"}}></hr>
      <Col md={9}>
      <p style={{padding: "60px"}}>Inclusive Fashion: We believe that fashion has no boundaries and should celebrate diversity in all its forms. Our clothing embraces inclusivity, offering a wide range of sizes, styles, and designs that cater to people of all body types, ages, genders, and backgrounds. We strive to create a welcoming space where everyone feels represented and empowered to express their individuality.</p>
      </Col>
        
      <Col md={3} >
      <Image src={"/images/ethical.png"} alt="logo" fluid rounded />
      </Col>

      <hr style={{margin: "50px 200px 50px 0px"}}></hr>
      <Col md={3}>
        <Image src={"/images/materials.png"} alt="logo" fluid rounded />
      </Col>
        
      <Col md={9} >
      <p style={{padding: "60px"}}> Sustainable Fashion: At [Your Clothing Retailer], we take responsibility for the planet we call home. We are passionate about sustainable fashion, offering a curated collection of eco-friendly and ethically produced garments. From organic fabrics to recycled materials, every piece you find in our store is designed with the environment in mind. Join us in reducing our ecological footprint and making a lasting impact on the fashion industry.</p>
      </Col>

    </Row>
    </Container>
  )
}

export default AboutScreen

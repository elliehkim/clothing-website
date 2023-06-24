import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import OrderScreen from './screens/OrderScreen'
import OrderCompleteScreen from './screens/OrderCompleteScreen'
import SearchScreen from './screens/SearchScreen'

function App() {
  return (
    <Router>
      <Header />
      <main>
        <div>
          <Routes>
          <Route path='/' element={<HomeScreen />} exact/>
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/profile' element={<ProfileScreen />} />
          <Route path='/shipping' element={<ShippingScreen />} />
          <Route path='/payment' element={<PaymentScreen />} />
          <Route path='/order/:id' element={<OrderScreen />} />
          <Route path='/order-complete' element={<OrderCompleteScreen />} />
          <Route path='/product/:id' element={<ProductScreen />}/>
          <Route path='/cart/:id?' element={<CartScreen />}/>
          <Route path='/search' element={<SearchScreen />}/>
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;

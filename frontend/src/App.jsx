import { useState } from 'react'
import './index.css'
import { ToastContainer } from 'react-toastify';
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/Loginpopup/Loginpopup'
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/verify/Verify';
import MyOrders from './pages/MyOrders/MyOrders';
function App() {
  const [showLogin, setShowLogin] = useState(false);


  return (
    <>
      <ToastContainer autoClose={2000} />
      {
        showLogin ? <Loginpopup setShowLogin={setShowLogin} /> : <></>
      }
      <div className='w-[90%] md:w-[80%] m-auto'>
        <NavBar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>

      </div>
      <Footer />
    </>
  )
}

export default App

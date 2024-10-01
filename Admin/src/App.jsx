
import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar/NavBar'
import SideBar from './components/SideBar/SideBar'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Order from './pages/Orders/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const url = "https://hungry-food-backend-mu3e.onrender.com"


  return (
    <>
      <div>
        <ToastContainer />
        <NavBar />
        <hr />
        <div className='flex '>
          <SideBar />
          <Routes>
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/order' element={<Order url={url} />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App

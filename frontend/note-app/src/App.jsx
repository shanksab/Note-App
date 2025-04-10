import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Modal from "react-modal";



Modal.setAppElement('#root');



const App = () => {
  return (

    <BrowserRouter>
        <Routes>
              <Route path='/dashboard' element={<Home/>}></Route>
              <Route path='/' element={<Login/>}></Route>
              <Route path='/signup' element={<Signup/>}></Route>

        </Routes>
    </BrowserRouter>
   
  )
}

export default App

import React from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from '../components/form/login/Login'
import Registration from '../components/form/registration/Registration'
import Profile from '../components/form/profile/Profile'
import Header from '../layout/header/Header'
import Footer from '../layout/footer/Footer'
const Routing = () => {

  return (
    <Router> 
      <Header/>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='registration' element={<Registration/>}/>
        <Route path='profile' element={<Profile/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default Routing
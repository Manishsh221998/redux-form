import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authSlice from '../authSlice/AuthSlice'
 
 const Store=configureStore({
    reducer:{
         auth:authSlice
    }
 })

export default Store
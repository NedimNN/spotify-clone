import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import Profile from '../pages/Profile'
import NotFound from '../pages/NotFound'
import Explore from '../pages/Explore'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/explore' element={<Explore />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}
export default Routers
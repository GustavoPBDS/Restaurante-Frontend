import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import styles from './App.module.scss'

import NavBar from './components/NavBar/NavBar'

import Home from './pages/Home/Home'
import Contact from './pages/Contact/Contact'

function App() {

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App

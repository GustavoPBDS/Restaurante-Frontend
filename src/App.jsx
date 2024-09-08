import { useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import styles from './App.module.scss'

import NavBar from './components/NavBar/NavBar'

import Home from './pages/Home/LP'
import Contact from './pages/Contact/Contact'
import { useDispatch, useSelector } from 'react-redux'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'

import Message from './components/Message/Message'
import { useAuth } from './hooks/useAuth'
import { useCookiesCustom } from './hooks/useCookiesCustom'

import Router from './Router'

function App() {
    const dispatch = useDispatch(),
        [globalError, setGlobalError] = useState(null),

        {error: errorAuth} = useSelector(state=>state.auth),

        {ErrorsG} = useSelector(state=>state.globalErrors)

    useEffect(()=>{
        const errors = [errorAuth, ErrorsG].filter(Boolean)
        if (errors.length > 0){
            if (errors[0].type == 'global' || errors[0].type == undefined) return setGlobalError(errors[0].message)
            setGlobalError(null)
        }
        else{
            setGlobalError(null)
        }
    },[errorAuth, ErrorsG])

    useAuth()
    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Router globalError={globalError}/>
            </BrowserRouter>
        </div>
    )
}

export default App

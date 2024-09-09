import { useEffect, useState, useCallback} from "react"

import { useDispatch, useSelector } from "react-redux"
import { reset, register, getAuthUser, login} from "../slices/authSlice"
import { useCookiesCustom} from './useCookiesCustom'
import useErrors from "./useErrors"
import { authService } from "../services/authService"

export const useAuth = () => {
    const dispatch = useDispatch(),
        {cookie, setToken, deleteCookie} = useCookiesCustom('user'),
        {user} = useSelector(state=>state.auth),
        {dispatchGlobalError} = useErrors(),

        [isAuth, setIsAuth] = useState(false)

    useEffect(()=>{
        if(user) return setIsAuth(true)
        if (!cookie) return setIsAuth(false)
        getUserFromToken(cookie)
    }, [user, cookie])

    const registerUser = useCallback((userObject) => {
        dispatch(register({userObject, setToken}))
    }, [dispatch, setToken])
    
    const loginUser = useCallback((userObject) => {
        dispatch(login({userObject, setToken}))
    }, [dispatch, setToken])
    
    const getUserFromToken = useCallback((token) => {
        dispatch(getAuthUser({token}))
    }, [dispatch])

    const logout = useCallback(()=>{
        deleteCookie('user')
    }, [deleteCookie])

    const sendEmail = useCallback(async(body, token)=>{
        try {
            return await authService.sendmail(body, token)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [deleteCookie])
    

    useEffect(()=>{
        dispatch(reset())
    },[dispatch])

    return {registerUser, loginUser, isAuth, logout, sendEmail}
}

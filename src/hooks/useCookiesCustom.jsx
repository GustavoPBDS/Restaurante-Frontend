import {useState, useEffect} from 'react'
import { useCookies } from 'react-cookie'

export const useCookiesCustom = (name) => {
    const [cookies, setCookie, removeCookie] = useCookies([name]),
        cookie = cookies[name]

    const createCookie = (cookieValue)=>{
        setCookie(name, cookieValue, {
            path:'/',
            expires: new Date(Date.now() + 7 * 86400000)
        })
    }
    const deleteCookie = ()=>{
        removeCookie(name, {path:'/'})
    }
    const setToken = (token)=>{
        setCookie(name, 'Bearer '+token, {
            path:'/',
            expires: new Date(Date.now() + 7 * 86400000)
        })
    }

    return {cookie, setToken, createCookie, deleteCookie}
}
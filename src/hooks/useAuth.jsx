import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { reset, register} from "../slices/authSlice"

export const useAuth = () => {
    const dispatch = useDispatch()

    const registerUser = (userObject)=>{
        dispatch(register({userObject}))
    }

    useEffect(()=>{
        dispatch(reset())
    },[dispatch])

    return {registerUser}
}

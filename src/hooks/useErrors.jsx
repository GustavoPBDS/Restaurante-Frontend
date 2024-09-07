import { useEffect, useState } from 'react'
import {setErrorGlobal, reset} from '../slices/globalErrorsSlice'
import { useDispatch } from 'react-redux'

const useErrors = () => {
    const [inputsErrors, setInputErrors] = useState({}),
        dispatch = useDispatch()

    const setError = (type, message)=>{
        setInputErrors(value => ({...value, [type]:message}))
    }
    const getError = (type)=>{
        return inputsErrors && inputsErrors[type]
    }
    const concatErrors = (errorsObject)=>{
        setInputErrors(value=> ({...value, ...errorsObject}))
    }
    const hasErrors = (errorsObject)=>{
        return Object.values(inputsErrors).some(value => value !== '') || Object.values(errorsObject).some(value => value !== '')
    }
    const resetErrors = ()=>{
        setInputErrors({})
    }
    const dispatchGlobalError = (message)=>{
        dispatch(setErrorGlobal({message}))
    }

    useEffect(()=>{
        dispatch(reset())
    }, [dispatch])

    return {setError, getError, concatErrors, inputsErrors, hasErrors, resetErrors, dispatchGlobalError}
}

export default useErrors
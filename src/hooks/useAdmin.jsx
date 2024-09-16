import {useCallback} from "react"
import useErrors from "./useErrors"
import { authService } from "../services/authService"
import { productsService } from "../services/productsService"

export const useAdmin = () => {
    const {dispatchGlobalError} = useErrors()

    const getUsers = useCallback(async(token)=>{
        try {
            return await authService.getUsers(token)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const editAnotherUser = useCallback(async(body, token, uid)=>{
        try {
            return await authService.updateUser(body, token, uid, null)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const deleteAnotherUser = useCallback(async(token, uid)=>{
        try {
            return await authService.deleteUser(token, uid)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])


    const createProduct = useCallback(async(token, body)=>{
        try {
            return await productsService.createProduct(token, body)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const editProduct = useCallback(async(token, body, pid)=>{
        try {
            return await productsService.updateProduct(token, body, pid)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const removeProduct = useCallback(async(token, pid)=>{
        try {
            return await productsService.deleteProduct(token, pid)
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])

    

    return {getUsers, editAnotherUser, deleteAnotherUser, createProduct, editProduct, removeProduct}
}

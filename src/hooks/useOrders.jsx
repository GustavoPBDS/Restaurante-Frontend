import {useEffect, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import {ordersService} from '../services/ordersService'
import useErrors from './useErrors'

export const useOrders = () => {
    const {dispatchGlobalError} = useErrors()

    const getOrders = useCallback(async(token)=>{
        try {
            const Orders = await ordersService.Orders(token)
            return Orders
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const createOrder = useCallback(async(token, data)=>{
        try {
            const Orders = await ordersService.CreateOrder(token, data)
            return Orders
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const payOrder = useCallback(async(token, oid)=>{
        try {
            const Orders = await ordersService.PayOrder(token, oid)
            return Orders
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const cancelOrder = useCallback(async(token, oid)=>{
        try {
            const Orders = await ordersService.CancelOrder(token, oid)
            return Orders
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])


    return {getOrders, cancelOrder, payOrder, createOrder}
}

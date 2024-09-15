import {makeAxiosConfig} from '../utils/ApiData'
import axios from 'axios'

export const ordersService = new class{
    async Orders(token){
        const url = `orders`,
            config = makeAxiosConfig('GET', url, token)
        
        try {
            const res = await axios(config)
            return res.data.orders
        } catch (err) {
            throw err.response.data
        }
    }
    async CreateOrder(token, data){
        const url = `order`,
            config = makeAxiosConfig('POST', url, token, data)
        
        try {
            const res = await axios(config)
            return res.data.order
        } catch (err) {
            throw err.response.data
        }
    }
    async PayOrder(token, oid){
        const url = `pay-order/${oid}`,
            config = makeAxiosConfig('PUT', url, token)
        
        try {
            const res = await axios(config)
            return res.data.order
        } catch (err) {
            throw err.response.data
        }
    }
    async CancelOrder(token, oid){
        const url = `cancel-order/${oid}`,
            config = makeAxiosConfig('DELETE', url, token)
        
        try {
            const res = await axios(config)
            return res.data.order
        } catch (err) {
            throw err.response.data
        }
    }
}
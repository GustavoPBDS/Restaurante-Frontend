import {makeAxiosConfig} from '../utils/ApiData'
import axios from 'axios'

export const itensService = new class{
    async Itens(token, oid){
        const url = `order/${oid}`,
            config = makeAxiosConfig('GET', url, token)
        
        try {
            const res = await axios(config)
            return res.data
        } catch (err) {
            throw err.response.data
        }
    }
    async SetProductInOrder(token, oid, pid, amount){
        const url = `order/item/${oid}/${pid}`,
            config = makeAxiosConfig('POST', url, token, {amount})
        
        try {
            const res = await axios(config)
            return res.data.orderItem
        } catch (err) {
            throw err.response.data
        }
    }
    async updateAmount(token, oid, pid, id, amount){
        const url = `order/item/${oid}/${pid}/${id}`,
            config = makeAxiosConfig('PUT', url, token, {amount})
        
        try {
            const res = await axios(config)
            return res.data.orderItens
        } catch (err) {
            throw err.response.data
        }
    }
    async removeItemInOrder(token, oid, pid, id){
        const url = `order/item/${oid}/${pid}/${id}`,
            config = makeAxiosConfig('DELETE', url, token)
        
        try {
            const res = await axios(config)
            return res.data
        } catch (err) {
            throw err.response.data
        }
    }
    
}
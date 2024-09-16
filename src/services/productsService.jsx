import {makeAxiosConfig} from '../utils/ApiData'
import axios from 'axios'

export const productsService = new class{
    async ProductsCategories(){
        const url = `products/categories`,
            config = makeAxiosConfig('GET', url)
        
        try {
            const res = await axios(config)
            return res.data.products
        } catch (err) {
            throw err.response.data
        }
    }
    async ProductsCategory(category){
        const url = `products/${category}`,
            config = makeAxiosConfig('GET', url)
        
        try {
            const res = await axios(config)
            return res.data.products
        } catch (err) {
            throw err.response.data
        }
    }

    async Products(){
        const url = `products`,
            config = makeAxiosConfig('GET', url)
        
        try {
            const res = await axios(config)
            return res.data.products
        } catch (err) {
            throw err.response.data
        }
    }
    async Product(pid){
        const url = `product/${pid}`,
            config = makeAxiosConfig('GET', url)
        
        try {
            const res = await axios(config)
            return res.data.product
        } catch (err) {
            throw err.response.data
        }
    }
    async Search(name, categories){
        let objectSearch = {}

        name ? objectSearch.name = name : objectSearch.name = ''
        categories ? objectSearch.categories = categories : objectSearch.categories = ''

        const params = new URLSearchParams(objectSearch),
            url = `search-product?${params.toString()}`,
            config = makeAxiosConfig('GET', url)
        
        try {
            const res = await axios(config)
            return res.data.products
        } catch (err) {
            throw err.response.data
        }
    }

    async createProduct(token, body){
        const url = `product`,
            config = makeAxiosConfig('POST', url, token, body)
        
        try {
            const res = await axios(config)
            return res.data.product
        } catch (err) {
            throw err.response.data
        }
    }
    async updateProduct(token, body, pid){
        const url = `product/${pid}`,
            config = makeAxiosConfig('PUT', url, token, body)
        
        try {
            const res = await axios(config)
            return res.data.product
        } catch (err) {
            throw err.response.data
        }
    }
    async deleteProduct(token, pid){
        const url = `product/${pid}`,
            config = makeAxiosConfig('DELETE', url, token)
        
        try {
            const res = await axios(config)
            return res.data.product
        } catch (err) {
            throw err.response.data
        }
    }
}
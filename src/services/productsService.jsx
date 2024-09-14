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
}
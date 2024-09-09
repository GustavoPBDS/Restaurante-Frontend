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
}
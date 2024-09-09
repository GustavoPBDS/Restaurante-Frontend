import {useEffect, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import {productsService} from '../services/productsService'
import useErrors from './useErrors'

export const useProducts = () => {
    const {dispatchGlobalError} = useErrors()

    const getProductsCategories = useCallback(async()=>{
        try {
            const Products = await productsService.ProductsCategories()
            return Products
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])


    return {getProductsCategories}
}

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
    const getProductsCategory = useCallback(async(category)=>{
        try {
            const Products = await productsService.ProductsCategory(category)
            return Products
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])

    const AllProducts = useCallback(async()=>{
        try {
            const Products = await productsService.Products()
            return Products
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const searchResult = useCallback(async(name, categories)=>{
        try {
            const Products = await productsService.Search(name, categories)
            return Products
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])

    const getProduct = useCallback(async(pid)=>{
        try {
            const Product = await productsService.Product(pid)
            return Product
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])


    return {getProductsCategories, searchResult, AllProducts, getProduct, getProductsCategory}
}

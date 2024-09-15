import {useEffect, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import {itensService} from '../services/itensService'
import useErrors from './useErrors'

export const useItens = () => {
    const {dispatchGlobalError} = useErrors()

    const getItens = useCallback(async(token, oid)=>{
        try {
            const Itens = await itensService.Itens(token, oid)
            return Itens
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const SetProductInOrder = useCallback(async(token, oid, pid, amount)=>{
        try {
            const Itens = await itensService.SetProductInOrder(token, oid, pid, amount)
            return Itens
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const updateAmount = useCallback(async(token, oid, pid, id, amount)=>{
        try {
            const Itens = await itensService.updateAmount(token, oid, pid, id, amount)
            return Itens
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const removeItemInOrder = useCallback(async(token, oid, pid, id)=>{
        try {
            const Itens = await itensService.removeItemInOrder(token, oid, pid, id)
            return Itens
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])


    return {getItens, SetProductInOrder, removeItemInOrder, updateAmount}
}
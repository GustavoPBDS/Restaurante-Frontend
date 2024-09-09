import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setFilters, reset } from "../slices/filtersSlice"

export const useFilters = () => {
    const [filtersSelected, setFiltersSelected] = useState(),
        {filters} = useSelector(state=>state.filters),
        dispatch = useDispatch()

    useEffect(()=>{
        if(filtersSelected) {
            dispatch(setFilters(filtersSelected))
        }else{
            setFiltersSelected(filters)
        }
    },[filtersSelected])

    return {filtersSelected, setFiltersSelected}
}
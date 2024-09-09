import styles from './Filters.module.scss'

import { useState, useEffect } from 'react'

import {useCategories} from '../../hooks/useCategories'
import {useFilters} from '../../hooks/useFilters'

const Filters = ({setFilterClicked}) => {
    const {categories} = useCategories(),
        [filters, setFilters] = useState([]),
        {filtersSelected, setFiltersSelected} = useFilters(),
        [applyed, setApplyed] = useState(false)

    const handleFilterSelected = (category) =>{
        if (verifyFilterSelect(category)){
            setFilters(filters.filter(filter=>filter !== category))
        }else{
            setFilters(state=>[
                ...state,
                category
            ])
        }
    },
    verifyFilterSelect = (category) =>{
        return filters.find(filter=>filter == category)
    },
    handleApply = ()=>{
        if (filters) setFiltersSelected(filters)
        setApplyed(true)
    }

    useEffect(()=>{
        if (applyed) setFilterClicked()
    },[applyed])
    useEffect(()=>{
        if (filtersSelected) setFilters(filtersSelected)
    },[filtersSelected])
    
    return (
        <div className={`${styles.filters_popup}`}>
            <div className={styles.filters_container}>
                <div className={styles.categories}>
                    <p>Categorias dos produtos</p>
                    <ul>
                        <li className={verifyFilterSelect('Others') ? styles.active_li : ''} onClick={()=>handleFilterSelected('Others')}>Others</li>
                        {categories.map((categorie, index)=>(
                            <li key={index} className={verifyFilterSelect(categorie) ? styles.active_li : ''} onClick={()=>handleFilterSelected(categorie)}>{categorie}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <button className={styles.apply_filters} onClick={handleApply}>Apply</button>
        </div>
    )
}

export default Filters
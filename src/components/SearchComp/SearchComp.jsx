import { useNavigate } from 'react-router-dom'
import styles from './SearchComp.module.scss'
import SearchSvgNav from '../Icons/NavbarIcons/SearchSvgNav'
import Send from '../Icons/Send'
import FiltersSvg from '../Icons/FiltersSvg'
import { useEffect, useState } from 'react'
import Filters from './Filters'
import { useSelector } from 'react-redux'

const SearchComp = () => {
    const [search, setSearch] = useState(''),
        [filterClicked, setFilterClicked] = useState(false),
        [categories, setCategories] = useState(null),
        [name, setName] = useState(''),
        {filters} = useSelector(state=>state.filters)
    
    const navigate = useNavigate()
    
    const handleSubmit = (e)=>{
        e.preventDefault()

        if (!search) navigate('/search')
        if (filters) setCategories(filters.join(','))   
        setName(search)
    },
    handleFilterClick = ()=>{
        setFilterClicked(!filterClicked)
    }

    useEffect(()=>{
        let urlExplore = '/search?',
            paramsObject = {}

        if (name) paramsObject.name = name
        if (categories) paramsObject.categories = categories

        const params = new URLSearchParams(paramsObject)

        if (!params.toString()) return

        urlExplore += params.toString()
        navigate(urlExplore)
    },[name, categories])

    return (
        <div className={styles.searching_container}>
            <div className={styles.filter}>
                <div onClick={handleFilterClick} className={styles.filter_button}>
                    <span><FiltersSvg/></span>
                    <p>Categorias</p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.search}>
                <div className={styles.field}>
                    <SearchSvgNav/>
                    <input type="search" placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
                    <button>
                        <Send/>
                    </button>
                </div>
            </form>
            
            {filterClicked && <div className={styles.filter_popup_container}>
                <Filters setFilterClicked={handleFilterClick}/>
            </div>}
            {filterClicked && <div className={styles.overlay_filter} onClick={()=>setFilterClicked(false)}></div>}
        </div>
    )
}

export default SearchComp
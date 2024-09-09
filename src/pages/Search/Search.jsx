import { useSelector } from 'react-redux'
import SearchComp from '../../components/SearchComp/SearchComp'
import styles from './Search.module.scss'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import ProductBox from '../../components/ProductBox/ProductBox'

const Search = () => {
    const [products, setProducts] = useState(null)

    const {filters} = useSelector(state=>state.filters),
        [searchParams, setSearchParams] = useSearchParams(),
        {AllProducts, searchResult} = useProducts()

    const name = searchParams.get('name') || null,
        categories = searchParams.get('categories') || null

    const handleFilterProducts = ()=>{
        if (filters) return setProducts(products?.filter(product=>filters?.includes(product.category)))
    }    


    useEffect(()=>{
        if(name || categories){
            searchResult(name, categories).then(res=>setProducts(res))
        }else{
            AllProducts().then(res=>setProducts(res))
        }
        
    }, [name, categories])
    useEffect(()=>{
        if(filters && filters?.length > 0){
            handleFilterProducts()
        }else{
            AllProducts().then(res=>setProducts(res))
        }
    },[filters])

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.search_container}>
                    <SearchComp/>
                </div>
            </header>
            <div className={styles.content}>
                <h2>Explore os produtos</h2>
                <section>
                    {products?.map((product, i)=>(
                        <article key={i}>
                            <ProductBox productObj={product}/>
                        </article>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default Search
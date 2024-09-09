import styles from './Home.module.scss'

import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import { useProducts } from '../../hooks/useProducts'
import SearchComp from '../../components/SearchComp/SearchComp'
import ProductBox from '../../components/ProductBox/ProductBox'
import PlusSvg from '../../components/Icons/PlusSvg'

const Home = () => {
    const [productsCategories, setProductsCategories] = useState(null)

    const {getProductsCategories} = useProducts()

    useEffect(()=>{
        getProductsCategories().then(products=>setProductsCategories(products))
    },[])

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.search_container}>
                    <SearchComp/>
                </div>
            </header>
            <main className={styles.content}>
                <h2>Categorias: </h2>
                <section className={styles.categories_container}>
                    {productsCategories && Object.entries(productsCategories).map(([category, products], i)=>{

                        return (
                            <article key={i}>
                                <div className={styles.category_link}>
                                    <Link className={styles.category} to={`/products/${category}`}>{category}</Link>
                                </div>
                                <div className={styles.products_container}>
                                    {products?.slice(0,3).map((productObj, j)=>(
                                        <div key={j}>
                                            <ProductBox productObj={productObj}/>
                                        </div>
                                    ))}
                                    {products?.length > 3 && <div className={styles.see_more}>
                                        <Link to={`/products/${category}`}>
                                            <PlusSvg/>
                                            <p>Ver mais</p>
                                        </Link>    
                                    </div>}
                                </div>
                            </article>
                        )
                    })}
                </section>
            </main>
        </div>
    )
}

export default Home
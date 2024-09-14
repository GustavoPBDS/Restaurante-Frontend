import { useState, useEffect } from 'react'
import ProductBox from '../../components/ProductBox/ProductBox'
import SearchComp from '../../components/SearchComp/SearchComp'
import styles from './ProductsCategory.module.scss'
import { useProducts } from '../../hooks/useProducts'
import { useParams } from 'react-router-dom'

const ProductsCategory = () => {
    const [products, setProducts] = useState(null),
        {category} = useParams()

    const {getProductsCategory} = useProducts()

    useEffect(()=>{
        getProductsCategory(category).then(products=>setProducts(products))
    },[])

    return (
        <div className={styles.container}>
            <header>
                <div className={styles.search_container}>
                    <SearchComp/>
                </div>
            </header>
            <div className={styles.content}>
                <h2>{category}</h2>
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

export default ProductsCategory
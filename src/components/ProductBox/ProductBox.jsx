import styles from './ProductBox.module.scss'

import React from 'react'

import StarSvg from '../Icons/StarSvg'
import { Link } from 'react-router-dom'

const ProductBox = ({productObj}) => {
    const {pid, name, category, price, productImage, rating} = productObj

    return (
        <div className={`${styles.product_container}`}>
            <div className={styles.title_area}>
                <h3>{name}</h3>
                <p>R$: {price}</p>
            </div>
            <div className={styles.container_transition_hover}>
                <div className={styles.img_container}>
                    <img src={productImage !== 'default' ? productImage : '/imageProductDefault.jpg'} alt="product image" />
                    <div className={styles.footerImg}>
                        <div>
                            <p>{rating}</p>
                            <StarSvg full={true}/>
                        </div>
                        <div>
                            <p>
                                <span className={styles.container_span}>
                                    <span>{category}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.gradient_container}>
                        <Link to={`/product/${pid}`}>Ver Produto</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductBox
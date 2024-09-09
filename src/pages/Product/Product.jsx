import styles from './Product.module.scss'

import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'


const Product = () => {


    const {pid} = useParams()
    
    return (
        <div className={styles.container}>

            <div className={styles.content}>
                <h1>Product</h1>
            </div>
        </div>
    )
}

export default Product
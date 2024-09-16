import styles from './Product.module.scss'

import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useDispatch, useSelector } from 'react-redux'
import StarSvg from '../../components/Icons/StarSvg'
import CloseSvg from '../../components/Icons/CloseSvg'
import CommentsProduct from '../../components/Comment/CommentsProduct'
import {useOrders} from '../../hooks/useOrders'
import {useItens} from '../../hooks/useItens'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import { reset } from '../../slices/itemSlice'
import { useAdmin } from '../../hooks/useAdmin'

const Product = () => {
    const [product, setProduct] = useState(null),
        [seeComments, setSeeComments] = useState(false)

    
    const {pid} = useParams(),
        {getProduct} = useProducts(),
        {user} = useSelector(state=>state.auth),
        {Order} = useSelector(state=>state.item),
        {cookie:token} = useCookiesCustom('user'),
        {createOrder} = useOrders(),
        {removeProduct} = useAdmin(),
        {SetProductInOrder} = useItens(),
        dispatch = useDispatch(),
        navigate = useNavigate()
        


    const handlePay = (e)=>{
        e.preventDefault()

        if (!Order){
            createOrder(token, {orderBody:{amount:1, pid}}).then((res)=>{
                navigate(`/orders`)
            })
        }else{
            SetProductInOrder(token, Order, pid, 1).then((res)=>{
                navigate(`/order/${res.oid}`)
                dispatch(reset())
            })
        }
    }
    
    useEffect(()=>{
        getProduct(pid).then(res=>setProduct(res))
    },[pid])
    
    return (
        <div className={styles.container}>

            <section className={styles.content}>
                <article className={styles.product}>
                    <nav>
                        <Link className={styles.home_link} to='/home'>Home</Link>
                        <div className={styles.admin_buttons}>
                            {(user?.admin) ? <>
                                <Link to={`/product/create/${pid}`}>Editar</Link>
                                <button onDoubleClick={()=>{
                                    removeProduct(token, pid).then(res=>{navigate('/home')})
                                }} >Apagar</button>
                            </> : <></>}
                        </div>
                    </nav>
                    <div className={styles.product_image}>
                        <img src={product?.productImage !== 'default' ? product?.productImage : '/imageProductDefault.jpg'} alt="Imagem do produto" />
                        <div className={styles.rating_container}>
                            <div>
                                <p>{product?.rating}</p>
                                <StarSvg full={true}/>
                            </div>
                        </div>
                    </div>
                </article>
                <article className={styles.container_product_infos}>
                    <div className={styles.product_infos}>
                        <h2>{product?.name}</h2>
                        <h4>{product?.category}</h4>
                        <div className={styles.desc_container}>
                            <p>{product?.description}</p>
                        </div>
                    </div>

                    <div className={styles.product_actions}>
                        <div className={styles.comment_button}>
                            <button onClick={()=>setSeeComments(!seeComments)}>Ver Comentarios</button>
                        </div>
                        <div className={styles.buttons}>
                            <div className={styles.button_pay}>
                                <p>R$: {product?.price}</p>
                                <button onClick={handlePay}>Pedir</button>
                            </div>
                        </div>
                    </div>
                    

                </article>

                {seeComments && 
                    <article className={styles.comments_article}>
                        <CommentsProduct 
                            setSeeComments={setSeeComments}
                            pid={pid}
                        />
                    </article>
                }
            </section>
        </div>
    )
}

export default Product
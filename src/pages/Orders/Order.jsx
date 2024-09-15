import { useNavigate, useParams } from 'react-router-dom'
import styles from './Order.module.scss'
import { useEffect, useState } from 'react'
import { useItens } from '../../hooks/useItens'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import ItemComp from '../../components/Order/ItemComp'
import { useOrders } from '../../hooks/useOrders'
import PlusSvg from '../../components/Icons/PlusSvg'
import { setNextOrder } from '../../slices/itemSlice'
import { useDispatch } from 'react-redux'

const Order = () => {
    const {oid} = useParams(),
        {getItens} = useItens(),
        {cancelOrder, payOrder} = useOrders(),
        {cookie:token} = useCookiesCustom('user'),
        dispatch = useDispatch(),
        navigate = useNavigate()

    const [itens, setItens] = useState(null),
        [order, setOrder] = useState(null)

    
    const handleAddProduct = ()=>{
        if(oid) dispatch(setNextOrder(oid))
        navigate('/search')
    },
    handlePayOrder = ()=>{
        payOrder(token, oid).then(res=>{
            navigate(`/orders`)
        })
    },
    handleCancelOrder = ()=>{
        cancelOrder(token, oid).then(res=>{
            navigate(`/orders`)
        })
    }
    
    useEffect(()=>{
        if(oid) getItens(token, oid).then(res=>{
            setItens(res.itens)
            setOrder(res.order)
        })
    },[oid])


    useEffect(()=>{
        console.log(itens, 'itens')
        console.log(order, 'pedido')
    },[itens, order])


    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <h2>Pedido: <span>{oid}</span></h2>
                <section className={styles.itens_container}>
                    {itens?.map(item=>(
                        <article key={item.id}>
                            <ItemComp 
                                item={item}
                            />
                        </article>
                    ))}
                    <button className={styles.add_item} onClick={handleAddProduct}>
                        <PlusSvg/>
                        <p>Adicionar Produto</p>
                    </button> 
                </section>
                <div className={styles.order_actions}>
                    <button className={styles.cancel_order} onDoubleClick={handleCancelOrder}>Cancelar pedido</button>
                    <div className={styles.total_price}>
                        <p>Total R$:{order?.total_price}</p>
                        <button onClick={handlePayOrder}>Pagar pedido</button>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Order
import { useSelector } from 'react-redux'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import styles from './Orders.module.scss'

import { useEffect, useState } from 'react'
import { useOrders } from '../../hooks/useOrders'
import OrderComp from '../../components/Order/OrderComp'

const Orders = () => {
    const {cookie:token} = useCookiesCustom('user'),
        {user} = useSelector(state=>state.auth),
        {getOrders} = useOrders()

    const [orders, setOrders] = useState(null)


    useEffect(()=>{
        if (token) getOrders(token).then(res=>setOrders(res))
    },[token])

    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <h1>Pedidos:</h1>
                <section>
                    {orders?.map(order=>(
                        <article key={order.oid}>
                            <OrderComp 
                                order={order}
                            />
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Orders
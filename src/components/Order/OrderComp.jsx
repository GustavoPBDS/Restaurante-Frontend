import { Link } from 'react-router-dom'
import styles from './OrderComp.module.scss'

const OrderComp = ({order}) => {
    return (
        <ul className={styles.order_container}>
            <li>{order?.oid}</li>
            <li>{(new Date(order?.created_at).toLocaleDateString('pt-BR'))}</li>
            <li className={order?.status == 'PENDENTE' ? styles.pending : styles.payed}>{order?.status}</li>
            <li><Link to={`/order/${order?.oid}`}>Ver pedido</Link></li>
        </ul>
    )
}

export default OrderComp
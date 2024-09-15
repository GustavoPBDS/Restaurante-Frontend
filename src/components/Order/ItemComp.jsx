import { useState } from 'react'
import styles from './ItemComp.module.scss'
import { useItens } from '../../hooks/useItens'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import Message from '../Message/Message'

const ItemComp = ({item}) => {
    const [amount, setAmount] = useState(item?.amount),
        [message, setMessage] = useState(''),
        [itemRemoved, setItemRemoved] = useState(false)

    const {removeItemInOrder, updateAmount} = useItens(),
        {cookie:token} = useCookiesCustom('user')

    const handleAddAmount =()=>{
        setAmount(amount + 1)
    },
    handleRemoveAmount = ()=>{
        if(amount <= 1) return
        setAmount(amount - 1)
    },
    handleSave = ()=>{
        updateAmount(token, item.oid, item.pid, item.id, amount).then(res=>{
            setMessage('Alterações salvas com sucesso !')
        })
    },
    handleRemove = ()=>{
        removeItemInOrder(token, item.oid, item.pid, item.id).then(res=>{
            setItemRemoved(true)
            setMessage('Item removido com sucesso !')
        })
    }
    
    if (itemRemoved) return
    return (
        <ul className={styles.item_container}>
            {message ? <Message message={message} type={'sucess'} /> : <></>}
            <li className={styles.image_container}>
                <img src={item?.productImg !== 'default' ? item?.productImg : '/imageProductDefault.jpg'} alt="Imagem do produto" />
            </li>
            <li className={styles.text}>
                {item?.productName}
            </li>
            <li className={styles.text}>R$: {item?.item_price}</li>
            <li className={styles.amount_container}>
                <span onClick={handleAddAmount}>+</span>
                <div className={styles.amount}>
                    <p>{amount}</p>
                </div>
                <span onClick={handleRemoveAmount}>-</span>
            </li>
            <li className={styles.save}>
                <button onClick={handleSave}>Salvar</button>
            </li>
            <li className={styles.remove}>
                <button onDoubleClick={handleRemove}>Remover</button>
            </li>
        </ul>
    )
}

export default ItemComp
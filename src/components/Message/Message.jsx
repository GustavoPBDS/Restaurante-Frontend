import styles from './Message.module.scss'

import Error from '../Icons/Error'
import CorrectSignal from '../Icons/CorrectSignal'
import {useEffect, useState} from 'react'

const Message = ({message, type}) => {
    const [clear, setClear] = useState(false)

    useEffect(()=>{
        setClear(false)

        const tout = setTimeout(() => {
            setClear(true)
        }, 3000);

        return ()=>clearTimeout(tout)
    },[message])

    if (clear) return null
    return (
        <div className={`${styles.message_container} ${type === 'error' ? styles.error : type === 'sucess' ? styles.sucess : ''}`} onClick={()=>setClear(true)}>
            {type === 'error' && <Error/>}
            {type === 'sucess' && <CorrectSignal/>}
            <p>{message}</p>
        </div>
    )
}

export default Message
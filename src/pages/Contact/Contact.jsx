import { useEffect, useState } from 'react'
import SearchComp from '../../components/SearchComp/SearchComp'
import styles from './Contact.module.scss'
import useErrors from '../../hooks/useErrors'
import { useAuth } from '../../hooks/useAuth'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import Message from '../../components/Message/Message'

const Contact = () => {
    const [name, setName] = useState(''),
        [secondName, setSecondName] = useState(''),
        [email, setEmail] = useState(''),
        [message, setMessage] = useState(''),
        [res, setRes] = useState(null)

    const {getError, setError, hasErrors, inputsErrors} = useErrors(),
        {sendEmail} = useAuth(),
        {cookie} = useCookiesCustom('user')

    const handleSubmit = (e)=>{
        e.preventDefault()

        if (!name) setError('name', 'O nome não pode estar vazio')
        if (!email) setError('email', 'O email não pode estar vazio')
        if (!secondName) setError('secondName', 'O sobrenome não pode estar vazio')
        if (!message) setError('message', 'A mensagem não pode estar vazia')

        if(hasErrors(inputsErrors) || !name || !email || !secondName || !message) return

        const data = {
            name, email, secondName, message
        }

        sendEmail(data, cookie).then(r=>setRes(r))
    }

    return (
        <div className={styles.container}>
            {res && <Message type={'sucess'} message={'Email enviado com sucesso'} />}
            <main className={styles.content}>
                <h3>Entre em contato conosco</h3>
                <form onSubmit={handleSubmit}>
                    <div className={styles.name_area}>
                        <div className={styles.field}>
                            <label htmlFor="name">Nome</label>
                            <input type="text" id='name' placeholder='Digite seu nome' value={name} onChange={e=>setName(e.target.value)}/>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="secondName">Sobrenome</label>
                            <input type="text" id='secondName' placeholder='Digite seu sobrenome' value={secondName} onChange={e=>setSecondName(e.target.value)}/>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder='Digite seu email' value={email} onChange={e=>setEmail(e.target.value)}/>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="message">Mensagem</label>
                        <textarea type="text" id='message' placeholder='Digite sua mensagem' value={message} onChange={e=>setMessage(e.target.value)}/>
                    </div>

                    <button>Enviar</button>

                </form>
            </main>
        </div>
    )
}

export default Contact
import styles from './Login.module.scss'

import MailSvg from '../../components/Icons/MailSvg'
import PadlockSvg from '../../components/Icons/PadlockSvg'

import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useErrors from '../../hooks/useErrors'
import {useAuth} from '../../hooks/useAuth'
import { useSelector } from 'react-redux'

const Login = () => {
    const [email, setEmail] = useState(''),
        [password, setPassword] = useState('')

    const {getError,setError, hasErrors, inputsErrors} = useErrors(),
        {loginUser} = useAuth(),
        {sucess, loading} = useSelector(state=>state.auth),
        navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()

        if (!email) setError('email', 'O email não pode estar vazio')
        if (!password) setError('password', 'A senha não pode estar vazia')

        if(hasErrors(inputsErrors) || !email || !password ) return

        const userObject = {
            user:{
                email, password
            }
        }
        loginUser(userObject)
    }

    useEffect(()=>{
        if(sucess && !loading) navigate('/home')
    },[sucess, loading])

    return (
        <div className={styles.container}>
            <main className={styles.login_container}>
                <div className={styles.title_login}>
                    <h1>Acesse sua conta</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fields}>
                        <div className={styles.inputs_area}>
                            <div className={styles.field}>
                                <MailSvg/>
                                <input type="email" placeholder='Digite seu email' value={email} onChange={e=>setEmail(e.target.value)}/>
                                {getError('email') && <p className={styles.message_error_input}>
                                    {getError('email')}
                                </p>}
                            </div>
                            <div className={styles.field}>
                                <PadlockSvg/>
                                <input type="password" placeholder='Digite sua senha' value={password} onChange={e=>setPassword(e.target.value)}/>
                                {getError('password') && <p className={styles.message_error_input}>
                                    {getError('password')}
                                </p>}
                            </div>
                        </div>
                    </div>
                    <div className={styles.submit_container}>
                        <button>Entrar</button>
                    </div>
                </form>
                <footer>
                    <p>Não tem uma conta ? <Link to="/register">Cadastrar</Link></p>
                </footer>
            </main>
        </div>
    )
}

export default Login
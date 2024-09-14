import styles from './Register.module.scss'

import ProfileSvg from '../../components/Icons/ProfileSvg'
import MailSvg from '../../components/Icons/MailSvg'
import PadlockSvg from '../../components/Icons/PadlockSvg'
import UploadImageSvg from '../../components/Icons/UploadImageSvg'

import { useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useErrors from '../../hooks/useErrors'
import {useAuth} from '../../hooks/useAuth'
import { useSelector } from 'react-redux'

const Register = () => {
    const {dispatchGlobalError, setError, concatErrors, getError, hasErrors, inputsErrors} = useErrors(),
        {registerUser} = useAuth()

    const [name, setName] = useState(''),
        [email, setEmail] = useState(''),
        [password, setPassword] = useState(''),
        [confirmPassword, setConfirmPassword] = useState(''),
        [profileImgFile, setProfileImgFile] = useState(null),

        [draftImage, setDraftImage] = useState(''),
        {sucess, loading} = useSelector(state=>state.auth),
        navigate = useNavigate()


    useEffect(()=>{
        if (confirmPassword && password) {
            if (confirmPassword !== password) return setError('confirmPassword', 'As senhas não coincidem')
            return setError('confirmPassword', '')
        }
        return setError('confirmPassword', '')
    },[confirmPassword, password])

    

    const handleSubmit = (e)=>{
        e.preventDefault()

        if (!name) setError('name', 'O nome não pode estar vazio')
        if (!email) setError('email', 'O email não pode estar vazio')
        if (!password) setError('password', 'A senha não pode estar vazia')
        if (!confirmPassword) setError('confirmPassword', 'A senha não pode estar vazia')

        if(hasErrors(inputsErrors) || !name || !email || !password || !confirmPassword) return

        const userData = {
            name, email, password
        }

        const body = new FormData()
        body.append('image', profileImgFile)
        body.append('user', JSON.stringify(userData))

        registerUser(body)
    },
    handleImage = (e)=>{
        const files = e.target.files
        if (!files || files.length == 0) return
        
        let image = files[0]
        if (!image.name.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff|tif|heif|heic|ico|psd)$/i)) {
            dispatchGlobalError('Tipo de arquivo invalido')
            return
        }
        setProfileImgFile(image)
        setDraftImage(URL.createObjectURL(image))
    }

    useEffect(()=>{
        if(sucess && !loading) navigate('/home')
    },[sucess, loading])

    return (
        <div className={styles.container}>
            <main className={styles.register_container}>
                <div className={styles.title_register}>
                    <h1>Crie sua conta</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className={styles.fields}>
                        <div className={styles.inputs_area}>
                            <div className={styles.field}>
                                <ProfileSvg/>
                                <input type="text" placeholder='Digite seu nome' value={name} onChange={e=>setName(e.target.value)}/>
                                {getError('name') && <p className={styles.message_error_input}>
                                    {getError('name')}
                                </p>}
                            </div>
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
                            <div className={styles.field}>
                                <PadlockSvg/>
                                <input type="password" placeholder='Confirme sua senha' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                                {getError('confirmPassword') && <p className={styles.message_error_input}>
                                    {getError('confirmPassword')}
                                </p>}
                            </div>
                        </div>
                        <div className={styles.image_area}>
                            <input type="file" id="image" onChange={handleImage} accept='image/*'/>
                            <label htmlFor="image">
                                <span>
                                    {draftImage && <img src={draftImage} alt="draft-image"/>}
                                    {!draftImage && <UploadImageSvg/>}
                                </span>
                                <p>Escolha sua imagem de perfil</p>
                        </label>
                        </div>
                    </div>
                    <div className={styles.submit_container}>
                    <button disabled={loading}>{loading ? 'Carregando' : 'Cadastrar'}</button>
                    </div>
                </form>
                <footer>
                    <p>Já tem uma conta ? <Link to="/login">Login</Link></p>
                </footer>
            </main>
        </div>
    )
}

export default Register
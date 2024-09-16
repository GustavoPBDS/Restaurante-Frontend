import { useSelector } from 'react-redux'
import styles from './Config.module.scss'

import { useState, useEffect } from 'react'
import DefaultProfileImg from '../../components/Icons/ProfileIcon/ProfileDefault'
import EditSvg from '../../components/Icons/EditSvg'
import CloseSvg from '../../components/Icons/CloseSvg'
import useErrors from '../../hooks/useErrors'
import Message from '../../components/Message/Message'
import { useAuth } from '../../hooks/useAuth'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import { useNavigate, useParams } from 'react-router-dom'
import NotAllowed from '../Errors/NotAllowed'
import { useAdmin } from '../../hooks/useAdmin'

const Config = () => {
    const {user, sucess} = useSelector(state=>state.auth),
        {cookie:token} = useCookiesCustom('user'),
        {dispatchGlobalError} = useErrors(),
        {updateUser, deleteUser, getUser} = useAuth(),
        {editAnotherUser, deleteAnotherUser} = useAdmin(),
        navigate = useNavigate(),
        {uid} = useParams()

    const 
        [User, setUser] = useState(),
        [verifyDeleteAcc, setVerifyDeleteAcc] = useState(false),
        [imageExist, setImageExist] = useState(true),

        [editUsername, setEditUsername] = useState(false),
        [editEmail, setEditEmail] = useState(false),

        [username, setUsername] = useState(''),
        [email, setEmail] = useState(''),
        [profileImage, setProfileImage] = useState(null),

        [message, setMessage] = useState(null),
        [draftImage, setDraftImage] = useState('')




    const handleSaveConfig = ()=>{
        let user = {}

        if(username) user.name = username
        if(email) user.email = email

        
        const body = new FormData()

        body.append('user', JSON.stringify(user))
        if (profileImage) body.append('image', profileImage)

        if (body.has('user') || body.has('image')) {
            if (uid) editAnotherUser(body, token, uid).then(res=>{navigate('/users')})
            else updateUser(body, token)
        }
    },
    resetEdits = ()=>{
        setEditEmail(false)
        setEditUsername(false)

        setUsername('')
        setEmail('')
    },
    deleteAccount = ()=>{
        if (uid) deleteAnotherUser(token, uid).then(res=>{navigate('/users')})
        else deleteUser(token)
    },
    handleImage = (e)=>{
        const files = e.target.files
        /* setError('global', '') */
        if (!files || files.length == 0) return
        
        let image = files[0]
        if (!image.name.match(/\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff|tif|heif|heic|ico|psd)$/i)) {
            dispatchGlobalError('Tipo de arquivo inválido')
            return
        }
        setImageExist(true)
        setDraftImage(URL.createObjectURL(image))
        setProfileImage(image)
    }


    useEffect(()=>{
        if(sucess) setMessage('Alterações salvas !')
    },[sucess])
    useEffect(()=>{
        if (User) setDraftImage(User.profileImg)
    },[User])
    useEffect(()=>{
        if(!editUsername) setUsername('')
    }, [editUsername])
    useEffect(()=>{
        if(!editEmail) setEmail('')
    }, [editEmail])
    useEffect(()=>{
        if (uid) {
            getUser(uid).then(res=>setUser(res))
        }else{
            setUser(user)
        }
    },[uid])

    if(uid && !user?.admin) return <NotAllowed/>
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {message && <Message message={message} type={'sucess'} />}
                <div className={styles.configurations}>
                    <span>
                        <h2>Configurações</h2>
                        <p>Não esqueça de <span>salvar</span> antes de sair da pagina.</p>
                    </span>
                    <button onClick={handleSaveConfig}>Salvar</button>
                </div>

                <div className={styles.account_info}>
                    <h2>Informações da conta</h2>
                    <form className={styles.form_account} onSubmit={e=>e.preventDefault()}>
                        <div className={styles.edit_input}>
                            <div className={styles.infos}>
                                <label htmlFor="username">Username: </label>
                                {editUsername ? (
                                    <input id='username' value={username} onChange={e=>setUsername(e.target.value)} placeholder={User?.name} autoFocus/>
                                ) : (
                                    <span>{User?.name}</span>
                                )}
                            </div>
                            <span onClick={()=>setEditUsername(!editUsername)}>
                                {!editUsername && <EditSvg color={'#a9a9a9'}/>}
                                {editUsername && <CloseSvg color={'#a9a9a9'}/>}
                            </span>
                        </div>
                        <div className={styles.edit_input}>
                            <div className={styles.infos}>
                                <label htmlFor="email">Email Address: </label>
                                {editEmail ? (
                                    <input id='email' value={email} onChange={e=>setEmail(e.target.value)} placeholder={User?.email} autoFocus/>
                                ) : (
                                    <span>{User?.email}</span>
                                )}
                            </div>
                            <span onClick={()=>setEditEmail(!editEmail)}>
                                {!editEmail && <EditSvg color={'#a9a9a9'}/>}
                                {editEmail && <CloseSvg color={'#a9a9a9'}/>}
                            </span>
                        </div>
                    </form>
                </div>

                <div className={styles.profile_image}>
                    <div className={styles.profile_image_header}>
                        <h2>Imagem de perfil</h2>
                        <p>Troque sua foto de perfil</p>
                    </div>
                    <form onSubmit={e=>e.preventDefault()}>
                        <label htmlFor="image" className={styles.profile_container}>
                            <div className={styles.image_content}>
                                {user 
                                    ? (draftImage && imageExist 
                                        ? (<img 
                                                src={draftImage} 
                                                alt="draft-image" 
                                                onError={() => setImageExist(false)}
                                            />)
                                        : <DefaultProfileImg/>)
                                    : <DefaultProfileImg/>
                                }
                            </div>
                        </label>
                        <input type="file" id="image" onChange={handleImage} accept='image/*'/>
                    </form>
                </div>

                <div className={styles.delete_area}>
                    <button className={styles.delete} onClick={()=>setVerifyDeleteAcc(true)}>Deletar conta</button>
                    {verifyDeleteAcc && (<>
                        <div className={styles.optionsDelete}>
                            <span>Você tem certeza?</span>
                            <div className={styles.actions}>
                                <button onDoubleClick={deleteAccount}>Sim, delete minha conta</button>
                                <button onClick={()=>setVerifyDeleteAcc(false)}>Não, não delete minha conta</button>
                            </div>
                        </div>
                    </>)}
                </div>
            </div>
        </div>
    )
}

export default Config
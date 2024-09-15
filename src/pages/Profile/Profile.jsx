import styles from './Profile.module.scss'

import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import AdminIcon from '../../components/Icons/ProfileIcon/AdminIcon'
import DefaultProfileImg from '../../components/Icons/ProfileIcon/ProfileDefault'
import { useAuth } from '../../hooks/useAuth'
import { useParams } from 'react-router-dom'
import UsersSvg from '../../components/Icons/NavbarIcons/UsersSvg'

const Profile = () => {
    const [user, setUser] = useState(null),
        [imageExist, setImageExist] = useState(true)

    const {getUser} = useAuth(),
        {uid} = useParams()


    useEffect(()=>{
        if(uid) getUser(uid).then(res=>setUser(res))
    },[uid])

    return (
        <div className={styles.container}>
            <div className={styles.content}>

                <div className={styles.image_container}>
                    <div className={styles.image}>
                        {user?.profileImg && (user?.profileImg !== 'default' || user?.profileImg !== 'admin') && imageExist
                            ? <img src={user.profileImg} alt="Foto de perfil" onError={()=>setImageExist(false)}/> 
                            : <DefaultProfileImg/>}
                        
                    </div>
                    <div className={styles.border_icon}>
                        <div className={styles.user_rule}>
                            {user?.admin ? <AdminIcon/> : <UsersSvg/>}
                        </div>
                    </div>
                </div>

                <div className={styles.user_infos}>
                    <h1>{user?.name}</h1>
                    <p>{user?.email}</p>
                </div>
        
            </div>
        </div>
    )
}

export default Profile
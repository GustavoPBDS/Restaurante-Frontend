import { Link } from 'react-router-dom'
import styles from './UserComp.module.scss'
import DefaultProfileImg from '../Icons/ProfileIcon/ProfileDefault'

const UserComp = ({user, handleImagesError, imagesExist, index}) => {
    console.log(user)
    return (
        <ul className={styles.user_container}>
            <li className={styles.image_container}>
                {(user?.profileImg !== 'default' || user?.profileImg !== 'admin') && imagesExist[index]
                    ? <img src={user.profileImg} alt="Foto de perfil" onError={()=>handleImagesError(index)}/> 
                    : <DefaultProfileImg/>}
            </li>
            <li className={styles.text}>{user?.name}</li>
            {!user?.admin ? <li>
                <Link to={`/config/${user?.uid}`}>Configurar</Link>
            </li> : <></>}
            <li><Link to={`/user/${user?.uid}`}>Ver usuario</Link></li>
        </ul>
    )
}

export default UserComp
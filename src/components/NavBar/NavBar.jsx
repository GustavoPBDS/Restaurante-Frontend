import { Link, NavLink, useNavigate} from 'react-router-dom'
import styles from './NavBar.module.scss'
import { useEffect, useState } from 'react'
import LogoutSvg from '../Icons/NavbarIcons/LogoutSvg'
import DefaultProfileImg from '../Icons/ProfileIcon/ProfileDefault'
import { useSelector } from 'react-redux'
import OrdersSvg from '../Icons/NavbarIcons/OrdersSvg'
import HomeSvg from '../Icons/NavbarIcons/HomeSvg'
import UsersSvg from '../Icons/NavbarIcons/UsersSvg'
import SearchSvgNav from '../Icons/NavbarIcons/SearchSvgNav'
import ConfigSvg from '../Icons/NavbarIcons/ConfigSvg'
import { useAuth } from '../../hooks/useAuth'
import ContactSvg from '../Icons/NavbarIcons/ContactSvg'
import ProductSvg from '../Icons/NavbarIcons/ProductSvg'

const NavBar = () => {
    const [mouseIn, setMouseIn] = useState(false),
        [imageExist, setImageExist] = useState(true),
        {user} = useSelector(state=>state.auth),
        {logout} = useAuth(),
        navigate = useNavigate()

    const handleLeave = (e)=>{
        logout()
        navigate('/')
    }
    return (
        <nav className={`${styles.navbar_container} ${mouseIn ? styles.active : ''}`} 
                        onMouseEnter={()=>setMouseIn(true)} 
                        onMouseLeave={()=>setMouseIn(false)}>

            <div className={styles.actions_container}>
                <div className={styles.profile_info}>
                    <Link to={`/user/${user?.uid}`} className={styles.image_container}>
                        {user?.profileImg && user?.profileImg !== 'default' && imageExist
                            ? <img src={user.profileImg} alt="Foto de perfil" onError={()=>setImageExist(false)}/> 
                            : <DefaultProfileImg/>}
                    </Link>
                    {mouseIn && <h4>{user?.name}</h4>}
                    {mouseIn && <NavLink to='/config' className={({isActive})=>isActive ? `${styles.active_link} ${styles.config_container}` : styles.config_container}>
                       <span><ConfigSvg/></span> 
                    </NavLink>}
                </div>
                <ul>
                    <li>
                        <NavLink to='/home' className={({isActive})=>isActive ? styles.active_link : ''}>
                            <span><HomeSvg/></span>
                            {mouseIn && <span className={styles.nav_text}>Home</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/search' className={({isActive})=>isActive ? styles.active_link : ''}>
                            <span><SearchSvgNav/></span>
                            {mouseIn && <span className={styles.nav_text}>Pesquisar</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/orders' className={({isActive})=>isActive ? styles.active_link : ''}>
                            <span><OrdersSvg/></span>
                            {mouseIn && <span className={styles.nav_text}>Pedidos</span>}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/contact' className={({isActive})=>isActive ? styles.active_link : ''}>
                            <span><ContactSvg/></span>
                            {mouseIn && <span className={styles.nav_text}>Contato</span>}
                        </NavLink>
                    </li>
                    {user?.admin ? (<>
                        
                        <li>
                            <NavLink to='/users' className={({isActive})=>isActive ? styles.active_link : ''}>
                                <span><UsersSvg/></span>
                                {mouseIn && <span className={styles.nav_text}>Usuarios</span>}
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to='/product/create' className={({isActive})=>isActive ? styles.active_link : ''}>
                                <span><ProductSvg/></span>
                                {mouseIn && <span className={styles.nav_text}>Criar Produto</span>}
                            </NavLink>
                        </li>

                    </>) : <></>}
                </ul>
            </div>
            <div className={styles.account_leave}>
                <button onClick={handleLeave}>
                    <span><LogoutSvg/></span>
                </button>
            </div>
        </nav>
    )
}

export default NavBar
import { Link } from 'react-router-dom'
import styles from './NavBar.module.scss'

const NavBar = () => {
    return (
        <nav className={styles.navbar_container}>
            <Link to='/home'>Home</Link>
            <Link to='/contact'>Contact</Link>
        </nav>
    )
}

export default NavBar
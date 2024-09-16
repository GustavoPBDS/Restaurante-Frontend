import styles from './Errors.module.scss'

import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={`${styles.container}`}>
            <main className={styles.content}>
                <div className={styles.error}>
                    <h1>403</h1>
                    <h2>Você não tem permissão</h2>
                    <p>A página que você está procurando contem dados sensiveis, e são operados apenas por administradores.</p>
                </div>
                <nav>
                    <Link to='/home'>Home</Link>
                </nav>
            </main>
        </div>
    )
}

export default NotFound
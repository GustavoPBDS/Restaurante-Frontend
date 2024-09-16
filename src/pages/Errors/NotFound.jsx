import styles from './Errors.module.scss'

import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={`${styles.container}`}>
            <main className={styles.content}>
                <div className={styles.error}>
                    <h1>404</h1>
                    <h2>Pagina não encontrada</h2>
                    <p>A página que você está procurando pode ter sido removida, nome alterado ou está temporariamente indisponível.</p>
                </div>
                <nav>
                    <Link to='/home'>Home</Link>
                </nav>
            </main>
        </div>
    )
}

export default NotFound
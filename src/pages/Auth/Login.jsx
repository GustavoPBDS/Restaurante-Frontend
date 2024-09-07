import styles from './Login.module.scss'

const Login = () => {
    return (
        <div className={styles.container}>
            <main className={styles.login_container}>
                <div className={styles.title_login}>
                    <h1>Acesse sua conta</h1>
                </div>
            </main>
        </div>
    )
}

export default Login
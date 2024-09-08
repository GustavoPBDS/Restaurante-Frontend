import { useSelector } from 'react-redux'
import { useAuth } from '../../hooks/useAuth'
import styles from './LP.module.scss'
import { Link, useNavigate } from 'react-router-dom'

const LP = () => {
    const {token} = useSelector(state=>state.auth),
        navigate = useNavigate()

    return (
        <div className={styles.Home}>
            <header className={styles.header_home}>
                <nav>
                    <ul>
                        <li><Link to="/register">Criar conta</Link></li>
                        <li><Link to="/login">Acessar</Link></li>
                    </ul>
                </nav>
            </header>
            <main className={styles.content}>
                <div className={styles.title_container}>
                    <h1>Sabor & <span>Alma</span></h1>
                </div>
                <section className={styles.body_content}>
                    <article>
                        <h3>Nossa História</h3>
                        <p>No Sabor & Alma, acreditamos que a boa comida vai além de uma refeição. Ela conta histórias, evoca memórias e conecta pessoas. Fundado em 2023, no coração da cidade, nosso restaurante é o fruto de uma paixão pela culinária de alta qualidade e pelo acolhimento caloroso. Inspirados pela rica diversidade dos sabores brasileiros, combinamos ingredientes frescos e técnicas tradicionais para criar pratos que celebram tanto o regional quanto o inovador.</p>
                    </article>
                    <article>
                        <h3>Nossa Filosofia</h3>
                        <p>A comida deve ser uma experiência. Aqui no Sabor & Alma, cada prato é elaborado com cuidado, utilizando produtos locais e sazonais. Valorizamos a sustentabilidade, por isso mantemos uma parceria com produtores orgânicos e pescadores que respeitam o meio ambiente. Nosso compromisso é trazer o melhor da cozinha brasileira contemporânea, respeitando o legado das nossas raízes.</p>
                    </article>
                    <article>
                        <h3>Experiência</h3>
                        <p>Com um ambiente acolhedor e moderno, o Sabor & Alma oferece uma experiência gastronômica que combina conforto e sofisticação. Nosso salão tem uma decoração inspirada na natureza, com madeiras naturais, luz suave e detalhes artesanais que refletem a beleza do Brasil. Contamos com uma equipe atenciosa e qualificada, pronta para oferecer um atendimento de excelência, tornando cada visita memorável.</p>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default LP
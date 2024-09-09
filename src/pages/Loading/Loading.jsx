import styles from './Loading.module.scss'
import LoadingComp from '../../components/LoadingComp/LoadingComp'
const Loading = () => {
    return (
        <div className={styles.loading_container}>
            <LoadingComp/>
        </div>
    )
}

export default Loading
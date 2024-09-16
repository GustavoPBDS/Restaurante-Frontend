import styles from './Users.module.scss'

import { useSelector } from 'react-redux'
import NotAllowed from '../Errors/NotAllowed'
import {useAdmin} from '../../hooks/useAdmin'
import { useEffect, useState } from 'react'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import UserComp from '../../components/User/UserComp'

const Users = () => {
    const {user} = useSelector(state=>state.auth),
        {cookie:token} = useCookiesCustom('user'),
        {getUsers} = useAdmin()

    const [users, setUsers] = useState(null),
        [imagesExist, setImagesExist] = useState([])

    const handleImagesError = (index) =>{
        setImagesExist(state => {
            const newState = [...state];
            newState[index] = false;
            return newState;
        })
    }

    useEffect(()=>{
        getUsers(token).then(res=>setUsers(res))
    },[])
    useEffect(()=>{
        if (users) setImagesExist(Array(users.length).fill(true))
    },[users])

    if (!user?.admin) return <NotAllowed/>
    return (
        <div className={styles.container}>
            <main className={styles.content}>
                <h1>Usuarios:</h1>
                <section>
                    {users?.map((userInList, i)=>(
                        <article key={userInList.uid}>
                            <UserComp 
                                user={userInList}
                                handleImagesError={handleImagesError}
                                imagesExist={imagesExist}
                                index={i}
                            />
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}

export default Users
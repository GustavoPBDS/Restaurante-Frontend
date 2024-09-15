import styles from './CommentsProduct.module.scss'

import {useComments} from '../../hooks/useComments'
import { useEffect, useState } from 'react'
import CloseSvg from '../Icons/CloseSvg'
import StarSvg from '../Icons/StarSvg'
import Comment from './Comment'
import DefaultProfileImg from '../Icons/ProfileIcon/ProfileDefault'
import Send from '../Icons/Send'
import { useSelector } from 'react-redux'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import Rating from './Rating'

const CommentsProduct = ({setSeeComments, pid}) => {
    const {getComments, createComment} = useComments(),
        {user} = useSelector(state=>state.auth),
        {cookie:token} = useCookiesCustom('user')

    const [Comments, setComments] = useState(null),
        [imagesExist, setImagesExist] = useState([]),
        [imageExist, setImageExist] = useState(true),
        [commentValue, setCommentValue] = useState(''),
        [rating, setRating] = useState(0),
        [commentCreated, setCommentCreated] = useState(null)


    const handleImagesError = (index) =>{
        setImagesExist(state => {
            const newState = [...state];
            newState[index] = false;
            return newState;
        })
    },
    handleComment = (e)=>{
        e.preventDefault()

        if(!commentValue) return

        createComment(token, pid, {body:commentValue, rating}).then(res=>setCommentCreated(res))

    }

    useEffect(()=>{
        if(pid) getComments(pid).then(res=>setComments(res))
    },[pid, commentCreated])
    useEffect(()=>{
        if (Comments) setImagesExist(Array(Comments.length).fill(true))
    },[Comments])

    return (
        <div className={styles.comments_area}>
            <header className={styles.header_comments}>
                <span onClick={()=>setSeeComments(false)}><CloseSvg/></span>
                <h5>Comentarios</h5>
            </header>
            <main>
                <div className={styles.commments_container}>
                    {Comments?.map((com, i)=>(
                        <Comment key={com.cid} 
                            comment={com} 
                            handleImagesError={handleImagesError}
                            imagesExist={imagesExist}
                            index={i}
                            pid={pid}
                        />
                    ))}
                </div>
            </main>
            <footer className={styles.creating_comment}>
                <form onSubmit={handleComment}>
                    <div className={styles.profile_image_comment}>
                        {user 
                            ? ((user.profileImg !== 'default' || user.profileImg !== 'admin') && imageExist
                                ? <img src={user.profileImg} alt="Foto de perfil" onError={()=>setImageExist(false)}/> 
                                : <DefaultProfileImg/>)
                            : <DefaultProfileImg/>
                        }
                    </div>
                    <div className={styles.commenting}>
                        <div className={styles.header_creating_comment}>
                            <label htmlFor="comment">Comente como <span>@{user?.name}</span></label>
                            <Rating setRating={setRating} value={rating}/>
                        </div>
                        <div className={styles.input_container}>
                            <input type="text" id='comment' placeholder='Escreva seu comentario' value={commentValue} onChange={e=>setCommentValue(e.target.value)}/>
                            <button><Send/></button>
                        </div>
                    </div>
                </form>
            </footer>
        </div>
    )
}

export default CommentsProduct
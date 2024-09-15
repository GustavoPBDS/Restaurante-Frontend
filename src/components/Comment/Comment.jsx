import styles from './Comment.module.scss'


import { Link } from 'react-router-dom'
import DefaultProfileImg from '../Icons/ProfileIcon/ProfileDefault'
import {getTimeSinceDate} from '../../utils/FormatTime'
import Rating from './Rating'
import { useEffect, useState } from 'react'
import Send from '../Icons/Send'
import CloseSvg from '../Icons/CloseSvg'
import MoreIcon from '../Icons/MoreIcon'
import ArrowSvg from '../Icons/ArrowSvg'
import { useComments } from '../../hooks/useComments'
import { useSelector } from 'react-redux'
import { useCookiesCustom } from '../../hooks/useCookiesCustom'
import StarSvg from '../Icons/StarSvg'

const Comment = ({comment, handleImagesError, imagesExist, index, pid}) => {
    const {editComment, deleteComment} = useComments(),
        {user} = useSelector(state=>state.auth),
        {cookie:token} = useCookiesCustom('user')

    const [rating, setRating] = useState(comment?.rating),
        [openOptions, setOpenOptions] = useState(false),
        [commentValueEdited, setCommentValueEdited] = useState(''),
        [editing, setEditing] = useState(false),
        [commentRemoved, setCommentRemoved] = useState(false)

    const handleSubmitEdit = (e)=>{
        e.preventDefault()
        if(!commentValueEdited) return

        editComment(token, pid, comment.cid, {body:commentValueEdited, rating})

        setEditing(false)
    },
    handleEdit = ()=>{
        setEditing(!editing)
        setCommentValueEdited(comment.body)
    },
    verifyCommentUser = ()=>{
        if(!user) return
        return (comment.uid == user?.uid || user?.admin)
    },
    handleOptions = ()=>{
        setOpenOptions(!openOptions)
    },
    handleRemove = ()=>{
        deleteComment(token, pid, comment?.cid)
        setCommentRemoved(true)
    }


    if(commentRemoved) return
    return (
        <div className={styles.comment}>
            <Link to={`/user/${comment?.uid}`} className={styles.image_comment_container}>
                {(comment?.userImage !== 'default' || comment?.userImage !== 'admin') && imagesExist[index]
                    ? <img src={comment.userImage} alt="Foto de perfil" onError={()=>handleImagesError(index)}/> 
                    : <DefaultProfileImg/>}
            </Link>
            <div className={styles.body_comment}>
                <header className={styles.header_comment}>
                    <div className={styles.user_name}>
                        <Link to={`/user/${comment?.uid}`}>{comment?.userName}</Link>
                        <p>{getTimeSinceDate(comment?.created_at)}</p>
                    </div>
                    <div className={styles.rating}>
                        {!editing && <div>
                            <p>{comment?.rating}</p>
                            <StarSvg full={true}/>
                        </div>}
                        {editing && 
                            <Rating 
                                value={rating} 
                                setRating={setRating}
                            />}
                    </div>
                </header>
                <div className={styles.content_comment}>
                    {!editing && <p>{comment.body}</p>}
                    {editing && <form onSubmit={handleSubmitEdit}>
                        <input type="text" placeholder={commentValueEdited} value={commentValueEdited} onChange={e=>setCommentValueEdited(e.target.value)} autoFocus/>
                        <div className={styles.edit_actions}>
                            <span onClick={handleEdit}><CloseSvg/></span>
                            <button><Send/></button>
                        </div>
                    </form>}
                </div>
                <div className={styles.actions_comment}>
                    {verifyCommentUser() ? <>
                        <div className={`${styles.action} ${openOptions ? styles.action_active : ''}`} onClick={handleOptions}>
                            <MoreIcon active={openOptions}/>
                            <p>Mais</p>
                            {openOptions && <>
                                <ul className={styles.options}>
                                    <li onClick={handleEdit}><ArrowSvg/> Editar</li>
                                    <li onClick={handleRemove}><ArrowSvg/> Remover</li>
                                </ul>
                            </>}
                        </div>
                    </> : <></>}
                </div>
            </div>
        </div>
    )
}

export default Comment
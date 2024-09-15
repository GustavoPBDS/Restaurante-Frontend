import {useEffect, useCallback} from 'react'
import { useDispatch } from 'react-redux'
import {commentsService} from '../services/commentsService'
import useErrors from './useErrors'

export const useComments = () => {
    const {dispatchGlobalError} = useErrors()

    const getComments = useCallback(async(pid)=>{
        try {
            const Comments = await commentsService.allComments(pid)
            return Comments
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const createComment = useCallback(async(token, pid, data )=>{
        try {
            const Comment = await commentsService.postComment(token, pid, data)
            return Comment
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const editComment = useCallback(async(token, pid, cid, data)=>{
        try {
            const Comment = await commentsService.editComment(token, pid, cid, data)
            return Comment
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])
    const deleteComment = useCallback(async(token, pid, cid)=>{
        try {
            const Comment = await commentsService.deleteComment(token, pid, cid)
            return Comment
        } catch (err) {
            dispatchGlobalError(err.message)
        }
    }, [])


    return {getComments, createComment, editComment, deleteComment}
}

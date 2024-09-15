import {makeAxiosConfig} from '../utils/ApiData'
import axios from 'axios'

export const commentsService = new class{
    async allComments(pid){
        const url = `comments/${pid}`,
            config = makeAxiosConfig('GET', url)
        
        try {
            const res = await axios(config)
            return res.data.comments
        } catch (err) {
            throw err.response.data
        }
    }
    async postComment(token, pid, data){
        const url = `comment/${pid}`,
            config = makeAxiosConfig('POST', url, token, data)
        console.log(data)
        try {
            const res = await axios(config)
            return res.data.comment
        } catch (err) {
            throw err.response.data
        }
    }
    async editComment(token, pid, cid, data){
        const url = `comment/${pid}/${cid}`,
            config = makeAxiosConfig('PUT', url, token, data)
        
        try {
            const res = await axios(config)
            return res.data.comment
        } catch (err) {
            throw err.response.data
        }
    }
    async deleteComment(token, pid, cid){
        const url = `comment/${pid}/${cid}`,
            config = makeAxiosConfig('DELETE', url, token)
        
        try {
            const res = await axios(config)
            return res.data
        } catch (err) {
            throw err.response.data
        }
    }

}
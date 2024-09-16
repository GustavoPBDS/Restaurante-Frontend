import {makeAxiosConfig} from '../utils/ApiData'
import axios from 'axios'

export const authService = new class{
    async register(body, setToken){
        const url = `register`,
            config = makeAxiosConfig('POST', url, null, body)
        
        try {
            const res = await axios(config)
            setToken(res.data.token)
            return res.data.token
        } catch (err) {
            throw err.response.data
        }
    }
    async login(body, setToken){
        const url = `login`,
            config = makeAxiosConfig('POST', url, null, body)
        
        try {
            const res = await axios(config)
            setToken(res.data.token)
            return res.data.token
        } catch (err) {
            throw err.response.data
        }

    }
    async getAuthUser(token){
        const url = 'profile',
            config = makeAxiosConfig('GET', url, token)
        try {
            const res = await axios(config)
            return res.data.user
        } catch (err) {
            throw err.response.data
        }
    }
    async getUser(uid){
        const url = `user/${uid}`,
            config = makeAxiosConfig('GET', url)
        try {
            const res = await axios(config)
            return res.data.user
        } catch (err) {
            throw err.response.data
        }
    }
    async updateUser(body, token, uid, setToken){
        const url = !uid ? `user` : `user/${uid}`,
            config = makeAxiosConfig('PUT', url, token, body)
        try {
            const res = await axios(config)
            if (setToken) setToken(res.data.token)
            return res.data.token
        } catch (err) {
            throw err.response.data
        }
    }
    async deleteUser(token, uid){
        const url = !uid ? `user` : `user/${uid}`,
            config = makeAxiosConfig('DELETE', url, token)
        try {
            const res = await axios(config)
            return res.data
        } catch (err) {
            throw err.response.data
        }
    }
    async sendmail(body, token){
        const url = 'send-email',
            config = makeAxiosConfig('POST', url, token, body)
        try {
            const res = await axios(config)
            return res.data.sucess
        } catch (err) {
            throw err.response.data
        }
    }
    async getUsers(token){
        const url = 'users',
            config = makeAxiosConfig('GET', url, token)
        try {
            const res = await axios(config)
            return res.data.users
        } catch (err) {
            throw err.response.data
        }
    }

}
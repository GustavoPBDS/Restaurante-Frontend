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
}
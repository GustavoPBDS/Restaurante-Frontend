import {makeAxiosConfig} from '../utils/ApiData'
import axios from 'axios'

export const authService = new class{
    async register(body){
        const url = `register`,
            config = makeAxiosConfig('POST', url, null, body)
        
        try {
            const res = await axios(config)
            return res.data.token
        } catch (err) {
            throw err.response.data
        }

    }
}
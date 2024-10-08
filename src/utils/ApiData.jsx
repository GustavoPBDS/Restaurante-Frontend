export const apiLocal = import.meta.env.VITE_DOMAIN_API_LOCAL

export const makeAxiosConfig = (method, url, token=null, data=null)=>{
    const baseURL = `${apiLocal}/${url}`
    let config={
        method, 
        baseURL,
        headers: {}
    }

    if (data) config.data = data
    if (token) config.headers.Authorization = token

    return config
}
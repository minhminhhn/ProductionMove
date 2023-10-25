import axios from '../axios'
import { updateToken } from './authenticate'
import { getItem } from './localStorageUntils'


const methods = {
    POST: 'POST',
    GET: 'GET'
}


const useCallApi = (url, body = {}, method = methods.POST) => {
    updateToken()
    const auth = getItem('authenticate')
    const token = auth ? auth.token : ''
    return new Promise(async (resolve, reject) => {
        switch (method) {
            case methods.POST:
                await axios.post(
                    url,
                    body,
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                ).then((data) => {
                    resolve(data)
                }).catch((error) => {
                    reject(error)
                })
            default:
                reject(`Unsupported Method ${method}`)
        }
    })
}




export default useCallApi 
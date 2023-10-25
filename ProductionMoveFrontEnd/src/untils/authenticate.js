
import { userLogout, userIsLogin } from '../store/slices/userSlices';
import axios from '../axios'
import { store } from '../store/store';
import { getItem } from './localStorageUntils';

const _30_MINUTES = 1800000
const _60_MINUTES = 3600000

export const updateToken = async () => {
    if (localStorage.authenticate) {
        const authenticate = JSON.parse(localStorage.authenticate)
        if (Date.now() < authenticate.expired - _30_MINUTES) {
            store.dispatch(userIsLogin({
                token: authenticate.token,
                account: getItem('accountInformation')
            }))
            return authenticate.token
        }
        if (Date.now() > authenticate.expired - _30_MINUTES && Date.now() < authenticate.expired) {
            const responseMessage = await axios.get(
                'api/refresh-token',
                { headers: { Authorization: authenticate.token } }
            ).then((message) => {
                storeAuthentication(message.data.token)
            }).catch((err) => {
                store.dispatch(userLogout())
            })
            if (responseMessage) {
                return responseMessage.data.token
            }
        }
        if (Date.now() >= authenticate.expired) {
            store.dispatch(userLogout())
        }
    } else {
        store.dispatch(userLogout())
    }
}

export const storeAuthentication = (token) => {
    const authenticate = {
        token: token,
        expired: Date.now() + _60_MINUTES
    }
    localStorage.setItem('authenticate', JSON.stringify(authenticate))
    return authenticate
}
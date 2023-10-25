import socketIOClient from "socket.io-client"
import { store } from './store/store';
import * as socketSlice from './store/slices/socketSlice'
import { messageTitles } from './untils/constant'

export let socket;

export const connectServer = () => {
    if (!socket) {
        socket = socketIOClient.connect(process.env.REACT_APP_BACKEND_URL)
        // store.dispatch(socketSlice.socketIsConnected())
    }
    return socket
}

export const disconnectServer = () => {
    if (socket) {
        socket.disconnect()
        socket = null
        // store.dispatch(socketSlice.socketIsDisconnected())
    }
}

export const addCommunicate = (key, func) => {
    if (socket) {
        socket.on(key, func)
    }
}

export const authenticate = (token) => {
    if (!socket) {
        connectServer()
    }
    if (socket) {
        socket.on(messageTitles.AUTHENTICATE_RESPONSE, (message) => {
            if (message.status === 'SUCCESS') {
                // console.log("Authed")
                // store.dispatch(socketSlice.socketIsAuthenticated())
            } else {
                // store.dispatch(socketSlice.socketIsNotAuthenticated())
            }
        })
        socket.emit(messageTitles.AUTHENTICATE_REQUEST, token)
    }
}
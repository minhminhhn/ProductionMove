import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { connectServer, authenticate, disconnectServer, addCommunicate } from '../../socket'
import { messageTitles } from "../../untils/constant"

const SocketConnector = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const token = useSelector(state => state.user.account?.token)
    const socketConnect = () => {
        const socket = connectServer()
        addCommunicate(messageTitles.NEED_AUTHENTICATE, () => {
            if (isLoggedIn) {
                authenticate(token)
            }
        })

    }
    useEffect(() => {
        if (isLoggedIn) {
            socketConnect()
        } else {
            disconnectServer()
        }
    }, [isLoggedIn])

    return (<></>)
}


export default SocketConnector
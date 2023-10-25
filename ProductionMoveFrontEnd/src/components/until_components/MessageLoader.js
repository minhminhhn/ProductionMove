import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { connectServer, authenticate, disconnectServer, addCommunicate } from '../../socket'
import { messageTitles } from "../../untils/constant"
import { addMessage, clearMessage, getMessages } from '../../store/slices/messageSlice'

const MessageLoader = () => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch()

    useEffect(async () => {
        if (isLoggedIn) {
            connectServer()
            dispatch(getMessages({ count: 12, token: account.token }))
            addCommunicate(messageTitles.NEW_MESSAGE, (message) => {
                dispatch(addMessage(message))
            })
        } else {
            dispatch(clearMessage())
        }
    }, [isLoggedIn])
    return (<></>)
}

export default MessageLoader
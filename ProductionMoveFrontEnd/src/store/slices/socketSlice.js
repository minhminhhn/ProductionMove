import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuthenticated: false,
    isConnected: false
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        socketIsAuthenticated: (state, action) => {
            state.isAuthenticated = true
        },
        socketIsNotAuthenticated: (state, action) => {
            state.isAuthenticated = false
        },
        socketIsConnected: (state, action) => {
            state.isConnected = true
        },
        socketIsDisconnected: (state, action) => {
            state.isConnected = false
        }
    }
})

export const { socketIsAuthenticated, socketIsNotAuthenticated, socketIsConnected, socketIsDisconnected } = socketSlice.actions

export default socketSlice.reducer
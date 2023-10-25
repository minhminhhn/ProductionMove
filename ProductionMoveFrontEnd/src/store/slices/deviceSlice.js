import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    size: {
        width: 1280,
        height: 800,
    },
    scroll: {
        X: 0,
        Y: 0,
    },
    type: {
        isMobie: false,
        isTablet: false,
        isDesktop: true,
    }
}

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        updateSize: (state, action) => {
            state.size = action.payload
            return state
        },
        updateScroll: (state, action) => {
            state.scroll = action.payload
            return state
        },
        updateType: (state, action) => {
            const type = action.payload
            state.type.isDesktop = type.isDesktop
            state.type.isMobie = type.isMobie
            state.type.isTablet = type.isTablet
        },
    }
})

export const { updateSize, updateScroll, updateType } = deviceSlice.actions
export default deviceSlice.reducer
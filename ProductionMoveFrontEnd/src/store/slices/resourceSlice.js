import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    holders: {
        agencies: [],
        maintainCenters: [],
        factories: []
    },
    modelAttributes: {
        generations: [],
        bodyTypes: [],
        engineTypes: [],
        boostTypes: [],
        series: []
    }
}

export const resourceSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        addResources(state, action) {
            state = {
                ...state,
                ...action.payload
            }
            return state
        }
    },
})

export const { addResources } = resourceSlice.actions
export default resourceSlice.reducer
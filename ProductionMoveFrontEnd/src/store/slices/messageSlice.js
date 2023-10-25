import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

const initialState = {
    list: [],
    ids: [],
    index: 0
}

export const getMessages = createAsyncThunk(
    'message/getMessages',
    async (parameters, { rejectWithValue }) => {
        try {
            const data = await axios.post(
                '/api/get-messages-by-query',
                {
                    pageOffset: {
                        limit: parameters.count, // rows in a page
                        offset: 0   // page offset
                    }
                },
                {
                    headers: {
                        Authorization: parameters.token
                    }
                }
            )
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)

export const messageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        addMessage(state, action) {
            if (!state.ids.includes(action.payload.id)) {
                state.list.push(action.payload.message)
                state.ids.push(action.payload.message.id)
            }
            state.index += 1
        },
        clearMessage(state, action) {
            state.list = []
            state.ids = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            const listMessages = action.payload.data.rows
            listMessages.forEach(message => {
                // console.log(message.content)
                message.content = JSON.parse(message.content)
            });
            listMessages.forEach(message => {
                if (!state.ids.includes(message.id)) {
                    state.ids.push(message.id)
                    state.list.push(message)
                }
            })

        }).addCase(getMessages.rejected, (state, action) => {

        })
    }
})

export const { addMessage, clearMessage } = messageSlice.actions
export default messageSlice.reducer
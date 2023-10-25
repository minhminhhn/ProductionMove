import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storeAuthentication } from '../../untils/authenticate'
import axios from '../../axios'
import { saveItem, dropItem } from '../../untils/localStorageUntils'

const initialState = {
    account: null,
    isLoggedIn: false,
}

export const loginUser = createAsyncThunk(
    'user/login',
    async (account, { rejectWithValue }) => {
        try {
            const data = await axios.post(
                '/api/login-partner',
                {
                    userName: account.userName, password: account.password
                }
            )
            return data
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response.data)
        }
    }
)


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userIsLogin: (state, action) => {
            state.isLoggedIn = true
            state.account = { ...action.payload.account }
            state.account.token = action.payload.token
        },
        userLogout: (state, action) => {
            state.isLoggedIn = false
            state.account = null
            dropItem('authenticate')
            dropItem('accountInformation')
        }

    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            if (action.payload) {
                const data = action.payload.data
                storeAuthentication(data.token)
                state.isLoggedIn = true
                state.account = { ...data, token: data.token }
                delete data.token
                saveItem('accountInformation', data)

            }
        }).addCase(loginUser.rejected, (state, action) => {
            throw action.payload
        })
    }
})

export const { userNotLogin, userIsLogin, userLogout } = userSlice.actions
export default userSlice.reducer
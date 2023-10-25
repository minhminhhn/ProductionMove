import { createSlice } from "@reduxjs/toolkit";



export const themes = {
    LightingTheme: 'Lighting Theme',
    DarkTheme: 'Dark Theme'
}

const initialState = {
    theme: themes.LightingTheme
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {

    }
})

export default themeSlice.reducer 
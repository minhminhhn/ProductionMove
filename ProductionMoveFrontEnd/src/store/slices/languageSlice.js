import { createSlice } from '@reduxjs/toolkit'
import langs from '../translation/index'
import { getItem, saveItem } from '../../untils/localStorageUntils'

const getLocalLang = () => {
    const localLang = getItem('Language')
    if (localLang) {
        if (localLang._NAME_ == langs.vi._NAME_) {
            return langs.vi
        }
    }
    return langs.en
}
const initialState = getLocalLang()


export const languageSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        switchLanguage(state, action) {
            if (state._NAME_ === 'VI') {
                state = langs.en
                saveItem('Language', { _NAME_: langs.en._NAME_ })
            } else {
                state = langs.vi
                saveItem('Language', { _NAME_: langs.vi._NAME_ })
            }
            return state
        }
    },
})

export const { switchLanguage } = languageSlice.actions
export default languageSlice.reducer
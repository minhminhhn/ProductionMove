import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlices'
import messageReducer from './slices/messageSlice';
import languageReducer from './slices/languageSlice';
import deviceReducer from './slices/deviceSlice';
import resourceReducer from './slices/resourceSlice'
import { getDefaultMiddleware } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    lang: languageReducer,
    device: deviceReducer,
    resources: resourceReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
});

import { configureStore } from '@reduxjs/toolkit'
import ChatSlice from './slice/ChatSlice'

export const store = configureStore({
  reducer: {
    ChatSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import anecdoteReducer from './reducers/anecdoteReducer'

const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        notifications: notificationReducer
    }
})

export default store
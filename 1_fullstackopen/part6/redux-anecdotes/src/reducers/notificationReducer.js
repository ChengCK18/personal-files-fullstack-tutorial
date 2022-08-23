import { createSlice } from '@reduxjs/toolkit'

const initialState = ''


const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        notifyAnecdotesCreation(state, action) {
            const payloadCreatedAnecdote = action.payload
            return (`You have created => ${payloadCreatedAnecdote}`)
        },
        notifyAnecdotesVoted(state, action) {
            const payloadVotedAnecdote = action.payload.content
            return (`You have voted for => ${payloadVotedAnecdote}`)
        },
        removeNotification(state, action) {
            console.log('removing')
            return ''
        }

    }
})

export const { notifyAnecdotesCreation, notifyAnecdotesVoted, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
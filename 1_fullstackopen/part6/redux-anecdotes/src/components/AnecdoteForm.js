import { useDispatch } from 'react-redux'
import { notifyAnecdotesCreation, removeNotification } from '../reducers/notificationReducer'
import { createNewAnecdote } from '../reducers/anecdoteReducer'

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnecdotes = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesString.value
        event.target.anecdotesString.value = ''
        dispatch(createNewAnecdote(content))


        dispatch(notifyAnecdotesCreation(content))
        setTimeout(() => {
            dispatch(removeNotification())

        }, 3000)

    }

    return (
        <div>
            <h2>Create new anecdotes</h2>
            <form onSubmit={addAnecdotes}>
                <div><input name='anecdotesString' /></div>
                <button
                    type='submit'
                >create</button>
            </form>
        </div>
    )

}

export default AnecdotesForm
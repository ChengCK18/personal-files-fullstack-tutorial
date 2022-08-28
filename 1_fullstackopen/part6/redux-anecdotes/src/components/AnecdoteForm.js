import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnecdotes = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesString.value
        event.target.anecdotesString.value = ''
        dispatch(createNewAnecdote(content))



        const notificationMessage = `You have created "${content}"`
        dispatch(showNotification(notificationMessage, 5))
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
import { useDispatch } from 'react-redux'
import { newAnecdotes } from '../reducers/anecdoteReducer'
import { notifyAnecdotesCreation, removeNotification } from '../reducers/notificationReducer'

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnecdotes = (event) => {
        event.preventDefault()
        const content = event.target.anecdotesString.value
        console.log(content)
        event.target.anecdotesString.value = ''
        dispatch(newAnecdotes(content))
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
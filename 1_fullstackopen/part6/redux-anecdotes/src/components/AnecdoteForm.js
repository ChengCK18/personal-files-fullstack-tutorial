import { useDispatch } from 'react-redux'
import { newAnecdotes } from '../reducers/anecdoteReducer'
import { notifyAnecdotesCreation, removeNotification } from '../reducers/notificationReducer'
import noteService from '../services/anecdotes'

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const addAnecdotes = async (event) => {
        event.preventDefault()
        const content = event.target.anecdotesString.value
        console.log(content)
        event.target.anecdotesString.value = ''
        const reponse = await noteService.createNewAnec(content)
        dispatch(newAnecdotes(reponse))



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
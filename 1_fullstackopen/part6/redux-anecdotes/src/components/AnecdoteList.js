import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notifyAnecdotesVoted, removeNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteAnecdote(id))
        const votedAnecdote = anecdotes.find(anec => anec.id === id)
        dispatch(notifyAnecdotesVoted(votedAnecdote))
        setTimeout(() => {
            dispatch(removeNotification())

        }, 3000)
    }

    //make a copy, not modify the state directly. Map the sorted copy later
    const sortedByVotes = [].concat(anecdotes).sort((a, b) => a.votes > b.votes ? -1 : 1)

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedByVotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList

import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdotesService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        anecdotesService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <Notification />
            <Filter />
            <AnecdoteList />
            <AnecdotesForm />
        </div>
    )
}

export default App
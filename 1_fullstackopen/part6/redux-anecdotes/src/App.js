
import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
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
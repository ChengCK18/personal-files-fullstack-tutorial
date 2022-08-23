
import AnecdotesForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
const App = () => {
    return (
        <div>
            <Notification />
            <AnecdotesForm />
            <AnecdoteList />
        </div>
    )
}

export default App
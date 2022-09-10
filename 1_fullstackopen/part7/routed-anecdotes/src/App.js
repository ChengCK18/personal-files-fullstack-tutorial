import { useState } from 'react'
import AnecdoteList from './components/anecdoteList'
import CreateNew from './components/createNew'
import About from './components/about'

import {
    BrowserRouter as Router,
    Routes, Route, Link
} from "react-router-dom"

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link style={padding} to='/'>anecdotes </Link>
            <Link style={padding} to='/createNew'>create new </Link>
            <Link style={padding} to='/about'>about </Link>
        </div>
    )
}


const Footer = () => (
    <div>
        Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

        See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
    </div>
)



const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: 'If it hurts, do it more often',
            author: 'Jez Humble',
            info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
            votes: 0,
            id: 1
        },
        {
            content: 'Premature optimization is the root of all evil',
            author: 'Donald Knuth',
            info: 'http://wiki.c2.com/?PrematureOptimization',
            votes: 0,
            id: 2
        }
    ])

    const [notification, setNotification] = useState('')

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000)
        setAnecdotes(anecdotes.concat(anecdote))
    }

    const anecdoteById = (id) =>
        anecdotes.find(a => a.id === id)

    const vote = (id) => {
        const anecdote = anecdoteById(id)

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1
        }

        setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    }

    return (
        <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Routes>
                <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
                <Route path='/createNew' element={<CreateNew addNew={addNew} />} />
                <Route path='/about' element={<About />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App

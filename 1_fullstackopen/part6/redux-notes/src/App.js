import { useEffect } from 'react'

import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'



const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        //noteService.getAll().then(notes => dispatch(setNotes(notes)))
        dispatch(initializeNotes()) // to abstract the backend comms(line above) into single function call
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div>
            <NewNote />
            <VisibilityFilter />
            <Notes />
        </div>
    )
}

export default App
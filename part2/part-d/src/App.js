import React,{useEffect, useState} from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import './index.css'

const App = (props) => {
  const [notes, setNotes] = useState([])
  const [newNote,setNewNote] = useState(' ')
  const [showAll,setShowAll] = useState(true)
  const [errorMessage,setErrorMessage] = useState(null)

  const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

  useEffect(()=>{

    noteService
      .getAll()
      .then(intialNotes  => {
        setNotes(intialNotes)
      })
  },[])

  const toggleImportanceOf = (id) =>{
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch( error =>{
        setErrorMessage(`The note '${note.content}' was already deleted from server`)
        setTimeout( () => {
          setErrorMessage(null)
        },5000)
        
        setNotes(notes.filter(n => n.id !== id)) //update the page list with the latest list of notes from server
      })
  }


  const addNote = (event) =>{
    event.preventDefault()
    const noteObject = {
      content:newNote,
      date:new Date().toISOString(),
      important:Math.random() <0.5,
      id:notes.length +1
    }
    noteService
    .create(noteObject)
    .then(returnedNote => {
      setNotes(notes.concat(returnedNote))
      setNewNote('')
    })
    
  }

  const handleNoteChange = (event) =>{ //since App component controls the behaviour of input element due to assingment of App component state
    console.log(event.target.value)
    setNewNote(event.target.value)
  }



  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick ={() => setShowAll(!showAll)}>
          Show {showAll ? 'important':'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={ () => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input onChange={handleNoteChange} value={newNote}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}


export default App

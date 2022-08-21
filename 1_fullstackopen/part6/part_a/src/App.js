// const store = createStore(noteReducer)

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1
//     }
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2
//     }
// })


// const App = () => {
//     return (
//         <div>
//             <ul>
//                 {store.getState().map(
//                     note =>
//                         <li key={note.id}>
//                             {note.content} <strong>{note.important ? 'important' : ''}</strong>
//                         </li>
//                 )}
//             </ul>
//         </div>
//     )
// }

// export default App;

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { useDispatch, useSelector } from 'react-redux';
// import { createNote, toggleImportanceOf } from './reducers/noteReducer';




// const App = () => {
//     const dispatch = useDispatch()
//     const notes = useSelector(state => state)
//     //const importantNotes = useSelector(state => state.filter(note => note.important))

//     const addNote = (event) => {
//         event.preventDefault()
//         const content = event.target.note.value
//         event.target.note.value = ''
//         dispatch(createNote(content))
//     }

//     const toggleImportance = (id) => {
//         dispatch(toggleImportanceOf(id))
//     }

//     return (
//         <div>
//             <form onSubmit={addNote}>
//                 <input name='note' />
//                 <button type='submit'>Add</button>
//             </form>
//             <ul>

//                 {notes.map(note =>
//                     <li key={note.id}
//                         onClick={() => toggleImportance(note.id)}>
//                         {note.content} yeah
//                         <strong>{note.important ? 'Important' : ''}</strong>
//                     </li>
//                 )}
//             </ul>

//         </div>
//     )
// }



// export default App


import React from 'react';
import ReactDOM from 'react-dom/client';
import NewNote from './components/NewNote';
import Notes from './components/Notes';

const App = () => {

    return (
        <div>
            <NewNote />
            <Notes />
        </div>
    )
}

export default App
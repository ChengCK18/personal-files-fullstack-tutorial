import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
    // HEADS UP
    // createNote does not have automatic dispatch function and is just a REGULAR action creator(don't use this)
    // props.createNote provides the dispatch function that is connected to store
    console.log(createNote)
    console.log(props.createNote)

    const addNote = async (event) => {
        event.preventDefault()
        const content = event.target.note.value
        event.target.note.value = ''
        //dispatch(createNote(content))
        // const newNote = await noteService.createNew(content)
        // dispatch(createNote(newNote))
        props.createNote(content)

    }

    return (
        <form onSubmit={addNote}>
            <input name="note" />
            <button type="submit">add</button>
        </form>
    )
}

// OPTION 1
// const mapDispatchToProps = {
//     createNote
// }

// const ConnectedNewNotes = connect(
//     null, //there is no need for this component to access state vars
//     mapDispatchToProps
// )(NewNote)

// export default ConnectedNewNotes


// OPTION 2
// const mapDispatchToProps = dispatch => {
//     return {
//       createNote: value => {
//         dispatch(createNote(value))
//       },
//     }
//   }

export default connect(
    null,
    { createNote }
)(NewNote)
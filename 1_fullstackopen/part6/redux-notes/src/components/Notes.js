import { connect } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
    return (
        <li onClick={handleClick}>
            {note.content}
            <strong> {note.important ? 'important' : ''}</strong>
        </li>
    )
}

const Notes = (props) => {
    // const dispatch = useDispatch()

    const notesToShow = () => {
        if (props.filter === 'ALL') {
            return props.notes
        }
        return props.filter === 'IMPORTANT'
            ? props.notes.filter(note => note.important)
            : props.notes.filter(note => !note.important)
    }
    return (
        <ul>
            {notesToShow.map(note =>
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() =>
                        props.toggleImportanceOf(note.id)
                        // dispatch(toggleImportanceOf(note.id))
                    }
                />
            )}
        </ul>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         notes: state.notes,
//         filter: state.filter,
//     }
// }
const mapStateToProps = (state) => { //filtering of notes can be done here instead during mapping
    if (state.filter === 'ALL') {
        return {
            notes: state.notes
        }
    }
    return {
        notes: (state.filter === 'IMPORTANT'
            ? state.notes.filter(note => note.important)
            : state.notes.filter(note => !note.important)
        )
    }
}
const mapDispatchToProps = {
    toggleImportanceOf,
}


const ConnectedNotes = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notes)
export default ConnectedNotes
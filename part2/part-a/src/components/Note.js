import React from 'react'

const Note = ({id,note}) => {
    return(
    <div>
        <li>{note.content}</li> {note.important ? "Important": "Not important"}
        
    </div>
    )
}

export default Note
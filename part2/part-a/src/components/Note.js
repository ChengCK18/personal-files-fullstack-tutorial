import React from 'react'

const Note = ({id,note}) => {
    return(
    <li>{note.content}</li>
    )
}

export default Note
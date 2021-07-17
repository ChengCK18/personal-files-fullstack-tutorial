import React from 'react'

const Note = ({note,toggleImportance}) => {
   const label = note.important ? "Important": "Not important"
    
    return(
    <div>
        <li>
            {note.content}
            <button onClick={toggleImportance}>{label}</button>
        </li> 
        
    </div>
    )
}

export default Note
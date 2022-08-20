const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            return state.concat(action.data)
        case 'TOGGLE_IMPORTANCE':
            const id = action.data.id
            const noteToAlter = state.find(n => n.id === id)
            const changedNote = {
                ...noteToAlter,
                important: !noteToAlter.important
            }
            return state.map(note => note.id !== id ? note : changedNote)
        default:
            return state
    }


    // if (action.type === 'NEW_NOTE') {
    //     return state.concat(action.data) //'concat' create new copy of array with new item unlike 'push'. Does not violate 'pure function' criteria
    // }
    // return state

}

export default noteReducer
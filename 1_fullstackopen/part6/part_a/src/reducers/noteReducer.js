const noteReducer = (state = [], action) => {
    console.log('state now: ', state)
    console.log('action', action)
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

const generateId = () => {
    return Number((Math.random() * 1000000).toFixed(0))
}

export const createNote = (content) => { //Redux action creators

    return {
        type: 'NEW_NOTE',
        data: {
            content,
            important: false,
            id: generateId()
        }
    }
}
export const toggleImportanceOf = (id) => { //Redux action creators
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: { id }
    }
}

export default noteReducer
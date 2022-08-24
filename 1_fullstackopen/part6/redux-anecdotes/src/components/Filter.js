import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterAnecdoteReducer"

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        dispatch(updateFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Anecdotes filter: <input onChange={handleChange} />
        </div>
    )
}

export default Filter
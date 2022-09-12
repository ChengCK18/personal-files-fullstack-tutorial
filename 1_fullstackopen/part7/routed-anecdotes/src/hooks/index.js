import { useState } from "react";



// import  { useField } from '../hooks'
// to import the custom hook below, dir depends where u put.
export const useField = (type, name) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        name,
        value,
        onChange
    }

}


//Other hooks geos here
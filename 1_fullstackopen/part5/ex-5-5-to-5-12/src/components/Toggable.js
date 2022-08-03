import React, { useState, forwardRef, useImperativeHandle } from 'react'



const Toggable = forwardRef((props, refs) => {
    const [visibility, setVisibility] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }
    const hideWhenVisible = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }
    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>

        <div style={showWhenVisible}>
            {props.children}

        </div>
    </div>
})


export default Toggable
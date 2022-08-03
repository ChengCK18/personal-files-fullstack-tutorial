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

    console.log(props.children)
    return <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            {props.children[0] === undefined ? null : props.children[0]}
        </div>

        <div style={showWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            {props.children[1] === undefined ? props.children : props.children[1]}

        </div>
    </div>
})


export default Toggable
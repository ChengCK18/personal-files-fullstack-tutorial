import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Note from './Note'



test('renders content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }

    render(<Note note={note} />)
    const element = screen.getByText('Component testing is done with react-testing-library', { exact: false })
    expect(element).toBeDefined()


    const { container } = render(<Note note={note} />)

    const div = container.querySelector('.note')
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')

    //screen.debug(element) //To output HTML elements in text in console.log




})
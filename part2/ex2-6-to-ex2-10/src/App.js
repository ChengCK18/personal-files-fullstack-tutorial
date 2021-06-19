import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Helca Maduro', number: '020-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNum, setNewNum ] = useState('')
  const [ newSearchName, setNewSearchName] = useState('')

  //For search field result
  //use regular expression
  let re = new RegExp(newSearchName,"i");
  const listResult = newSearchName === '' ? persons : persons.filter(person => (person.name).match(re))

  const newNameVal = (event) =>{
    setNewName(event.target.value)
  }
  const newNumberVal = (event) => {
    setNewNum(event.target.value)
  }
  const newSearchNameVal = (event) => {
    setNewSearchName(event.target.value)
  }

  const onSubmit = (event) =>{
      event.preventDefault()
     

      const nameExisted = (person) => person.name === newName
      

      if(persons.some(nameExisted)){
        alert(`${newName} has already been added to phonebook :D`)
      }
      else{
        if(newNum === ''){
          alert(`Please give ${newName} a phone number :)`)
        }
        else{
          const newPerson = {
            name:newName,
            number:newNum
          }
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNum('')
        }
      }
  }

  return (
    <div>
      <h2>Phonebook ☎📖</h2>
      <Filter newSearchNameVal ={newSearchNameVal} newSearchName={newSearchName}/>
      
      <h2>Add New Contact in PhoneBook 📖</h2>
      <PersonForm onSubmit={onSubmit} newNameVal={newNameVal} newName={newName} newNumberVal={newNumberVal} newNum={newNum}/>
      
      <h2>Numbers ☎</h2>
      <ul>
        {
        listResult.map(person =>
          <Persons key={person.name} name={person.name} number={person.number}/>)
        }
      </ul>
    </div>
  )
}

export default App

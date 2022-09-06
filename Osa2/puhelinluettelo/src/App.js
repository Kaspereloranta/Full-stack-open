import { useState } from 'react'

const Number=(props) => {
  return(
    <p>{props.person.name} {props.person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,
      number: '040-1231244'}
    ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const addNumber = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number: newNumber
    }

    if((persons.map(person => person.name)).includes(newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(PersonObject))
      console.log(persons[2])
      setNewName('')
      setNewNumber('')   
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}  />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
      {persons.map(person => 
          <Number key={person.name} person={person}></Number>)}
      </ul>
       <Number person={persons}></Number>
    </div>
  )

}

export default App

/* 5.9 aikaa kulunut osa2: 4,5 h */
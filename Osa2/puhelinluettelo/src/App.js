import { useState } from 'react'

const Number=(props) => {
  console.log((props.person.name).toLowerCase().includes(props.filter.toLowerCase()))
   if((props.person.name).toLowerCase().includes(props.filter.toLowerCase())){
    return(
      <p>{props.person.name} {props.person.number}</p>
    ) 
   }
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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

  
  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <div>filter shown with <input value={filter} onChange={handleFilter}></input></div>

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
          <Number key={person.name} person={person} filter={filter}></Number>)}
      </ul>
    </div>
  )

}

export default App

/* 5.9 aikaa kulunut osa2: 4,5 h */
import { useState } from 'react'

const Number=(props) => {
   if((props.person.name).toLowerCase().includes(props.filter.toLowerCase())){
    return(
      <p>{props.person.name} {props.person.number}</p>
    ) 
   }
}

const Numbers=(props) => {
  return(
    <ul>
      {props.persons.map(person => 
          <Number key={person.name} person={person} filter={props.filter}></Number>)}
    </ul>
  )
}

const PersonForm=(props) => {
  return(
    <form onSubmit={props.addNumber}>
            <div>
              name: <input value={props.newName} onChange={props.handleNameChange}  />
            </div>
            <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
  )
}

const FilterForm=(props) => {
  return(
    <div>filter shown with <input value={props.filter} onChange={props.handleFilter}></input></div>
  )
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
      
      <FilterForm filter={filter} handleFilter={handleFilter}></FilterForm>
      
      <PersonForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      addNumber={addNumber}></PersonForm>
     
      <h2>Numbers</h2>    
      <Numbers persons={persons} filter={filter}></Numbers>
    </div>
  )

}

export default App

/* 6.9 aikaa kulunut osa2: 8,5 h

18.35 aloitus
*/

import { useState, useEffect } from 'react'
import personService from './services/persons'


const Number=(props) => {
   if((props.person.name).toLowerCase().includes(props.filter.toLowerCase())){
    return(
      <p >{props.person.name} {props.person.number}    
         <button  onClick={props.deletePerson(props.person.id)}> delete </button> </p>
    ) 
   }
}

const Numbers=(props) => {
  return(
    <ul> 
    {props.persons.map(person => 
          <Number key={person.id} person={person} filter={props.filter} 
           deletePerson={props.deletePerson}></Number>)}
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
  
  const [persons, setPersons] = useState([])
    
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response=>{
        setPersons(response.data)
      })
  }, [])

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
      personService
      .create(PersonObject)
      .then(response => {
        setPersons(persons.concat(response.data))
      })
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
  
  const deletePerson = (id) =>{
    const deleter = () => {
        if (window.confirm("Delete " + persons.find(person => person.id === id).name + "?")){      
          personService
            .erase(id)
            .then(response => {
              setPersons(persons.filter(person => person.id !== id))
            })
            .catch(error => {
              console.log('fail')
            }) 
         }
    }
    
    return deleter  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      
      <FilterForm filter={filter} handleFilter={handleFilter}></FilterForm>
      
      <PersonForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      addNumber={addNumber}></PersonForm>
     
      <h2>Numbers</h2>    
      <Numbers persons={persons} filter={filter} deletePerson={deletePerson}></Numbers>
    </div>
  )

}

export default App

/* 6.9 aikaa kulunut osa2: 8,5 h

18.35 aloitus
*/

// aikaa kulunut 11,5h
/* 10.9 alotus 13.30 */


/*11.9 alotius klo 13

{
  "persons": [
    { 
      "name": "Arto Hellas", 
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace", 
      "number": "39-44-5323523",
      "id": 2
    },
    { 
      "name": "Dan Abramov", 
      "number": "12-43-234345", 
      "id": 3
    },
    { 
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
    }
  ]
}
    
    
    */
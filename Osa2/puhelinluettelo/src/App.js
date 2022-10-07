import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


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
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)


  const addNumber = (event) => {
    event.preventDefault()
    const PersonObject = {
      name: newName,
      number: newNumber
    }

    if((persons.map(person => person.name)).includes(newName)){
      if(window.confirm(newName + " is already added to phonebook, replace the old number with a new one?")){
        const updatePerson = {
          name: newName,
          number: newNumber,
          id: persons.find(person => person.name === newName).id
        } 
        console.log(updatePerson)
        personService
        .update(updatePerson.id, updatePerson)
        .then(response => {
          console.log(response.data)
          setPersons(persons.map(person => person.id !== updatePerson.id ? person : response.data) )
          setNotification("Edited " + persons.find(person => person.id === updatePerson.id).name + "'s number")
          setNewName('')
          setNewNumber('')   
          setTimeout(()=>{
            setNotification(null)
          },5000)
        })
        .catch(error=>{
          setError("Information of " + persons.find(person => person.id === updatePerson.id).name + " has already been removed from server")
          setTimeout(()=>{
            setError(null)
          },5000)
          setNewName('')
          setNewNumber('')   
        }) 
      }
    }
       
    else{
      personService
      .create(PersonObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNotification("Added " + PersonObject.name)
      })
      .catch(error=>{
        setError("Invalid input")
        setTimeout(()=>{
          setError(null)
        },5000)
      })
      setNewName('')
      setNewNumber('')   
      setNotification("Added " + PersonObject.name)
      setTimeout(()=>{
        setNotification(null)
      },5000)
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
              setNotification("Deleted " + persons.find(person => person.id === id).name)
              setTimeout(()=>{
                setNotification(null)
              },5000)
            })
            .catch(error=>{
              setError("Information of " + persons.find(person => person.id === id).name + " has already been removed from server")
              setTimeout(()=>{
                setError(null)
              },5000)
              setNewName('')
              setNewNumber('')   
            }) 
         }
    }
    
    return deleter  
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notification}></Notification>
      <Error message={error}> </Error>

      <FilterForm filter={filter} handleFilter={handleFilter}></FilterForm>
      
      <PersonForm newName={newName} newNumber={newNumber} 
      handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      addNumber={addNumber}></PersonForm>
     
      <h1>Numbers</h1>    
      <Numbers persons={persons} filter={filter} deletePerson={deletePerson}></Numbers>
    </div>
  )

}

export default App


// aikaa kulunut 14,25 h 11.9 mennessä 
/*
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
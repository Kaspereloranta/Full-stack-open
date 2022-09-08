import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { useState, useEffect } from 'react';

const Country=(props)=> {
  if(props.filter==='' || props.filter===' '){
    return(
      <p></p>
    )
  }
  else if((props.country.name.common).toLowerCase().includes(props.filter.toLowerCase())){
    return(
      <p>{props.country.name.common}</p>
    ) 
   }
}

const Countries=(props) => {

  const countries2 = props.countries.map(country=>
    <Country key={country.name.common} country={country} filter={props.filter}></Country>)

  return(
    <ul>
      {props.countries.map(country=>
        <Country key={country.name.common} country={country} filter={props.filter}></Country>)}
    </ul>
  )
}

const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleInputChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      <h2>Countries</h2>
      <div>find countries <input value = {filter} onChange={handleInputChange}></input>
      </div>
      <Countries countries={countries} filter={filter}></Countries>
    </div>  
      )

}

export default App;


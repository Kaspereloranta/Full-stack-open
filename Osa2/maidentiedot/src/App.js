import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { useState, useEffect } from 'react';

const CountryDetails=(props)=>{
  console.log(props.country.languages)

  const lngs = props.country.map(language => language.value)
  console.log(lngs)
  return(
    <div>
    <h1>{props.country.name.common}</h1>
    <p>{props.country.capital}</p>
    <p>{props.country.area}</p>
    <b>languages:</b> 
    <ul>
      {/*props.country.languages.map(language => language.value)*/}
    </ul>
    <br></br><img src={props.country.flags.png}></img>    
    </div>
  )
}

const Country=(props)=> {
  if((props.country.name.common).toLowerCase().includes(props.filter.toLowerCase())){
    return(
      <p>{props.country.name.common}</p>
    ) 
   }
}

const Countries=(props) => {
    
  const countries = props.countries.map(country => country.name.common.toLowerCase()
  .includes(props.filter.toLowerCase()) ? country.name.common : null).filter(country => {
    return country != null
  })

  if(countries.length > 10 ){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }

  else if(countries.length===1){
    return(
      <CountryDetails country = {props.countries[1]}></CountryDetails> // tänne miten haetaan indeksi
    )
  }
  
  else {
    return(
      <ul>
      {props.countries.map(country=>
        <Country key={country.name.common} country={country} filter={props.filter}></Country>)}
    </ul>
    )
  }
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


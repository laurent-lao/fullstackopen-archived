import React, { useState, useEffect} from "react";
import axios from 'axios'

const Filter = ({filterTerm, handleFilterChange}) => {
  return(
    <form>
      <div>
        find countries <input value={filterTerm} onChange={handleFilterChange} />
      </div>
    </form>
  )
}

const TooMany = () => <div>Too many matches, specify another filter</div> 
const ListCountries = ({countries, handleShow}) => {
 return(
        <div>
        {countries.map((country) => (
          <li key={country.name}>{country.name} <button value={country.name} onClick={handleShow}>Show</button></li>
        ))}
      </div>
 )
}

const ListCountry = ({countries}) => {
  return(
    <div>
      {countries.map((country) => (
        <div>
          <h2>{country.name}</h2>
          <div>capital {country.capital}</div>
          <div>population {country.population}</div>
          <h2>languages</h2>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt={country.name} height="250" width="350"/>
       </div>
      ))}
    </div>
  )
}

const ShowCountries = ({countries, handleShow}) => {
  if (countries.length > 10)
    return <TooMany />
  else if (countries.length > 1)
    return <ListCountries countries={countries} handleShow={handleShow} />
  else
    return <ListCountry countries={countries} /> 

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterTerm, setFilterTerm] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  },[])
  console.log('render', countries.length, 'countries')

  const handleShow = (event) => {
    setFilterTerm(event.target.value.toLowerCase())
  }
 
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
  }

  const countriesToShow = filterTerm === '' ? countries : 
    countries.filter(
      country => country.name.toLowerCase().includes(filterTerm)
    )
 
  return (
    <div>
      <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange} />
      <ShowCountries countries={countriesToShow} handleShow={handleShow}/>
    </div>
  )
}

export default App;
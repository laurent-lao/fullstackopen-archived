import React, { useState, useEffect } from "react";
import axios from 'axios'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

// const Debug = ({ label, value }) => {
//   return (
//     <div>
//       DEBUG: {label}={value}
//     </div>
//   );
// };

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  
  const [filterTerm, setFilterTerm] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons)

  const personHook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }
  useEffect(personHook, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const isPersonAlreadyExists = persons.find(person => person.name === personObject.name)

    if (!isPersonAlreadyExists) {
      setPersons(persons.concat(personObject))  // Satisfies "Never mutate state directly"
      setNewName('')
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
    setFilterPersons(persons.filter((person => 
      (person.name.toLowerCase().includes(event.target.value.toLowerCase()) || person.number.includes(event.target.value))
    )))
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPersonData = {
    newName,
    handleNameChange,
    newNumber,
    handleNumberChange
  }

  const ListPersons = filterTerm === '' ? 
    <Persons people={persons} /> : <Persons people={filterPersons} />

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterTerm} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      { ListPersons }
    </div>
  );
};

export default App;

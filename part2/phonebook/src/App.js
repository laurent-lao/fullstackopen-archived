import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personService from "./services/person";

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
  const [errorMessage, setErrorMessage] = useState("test");
  const [isError, setIsError] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterPersons, setFilterPersons] = useState(persons)


  const showNotification = (message, isAnError) => {
    setIsError(isAnError)
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    const duplicatePerson = persons.find(person => person.name === personObject.name)




    if (!duplicatePerson) {
      personService
        .create(personObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))  // Satisfies "Never mutate state directly"
          //setNotification(`Added ${personObject.name}`, false)
          showNotification('lol', false)
        })
    }
    else {
      const isConfirmed = window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)

      if (isConfirmed) {
        personService
          .update(duplicatePerson.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== personObject.name ? person : returnedPerson))
            showNotification(`Replaced ${duplicatePerson.name}`, false)
          })

      }
    }

    // Reset fields
    setNewName('')
    setNewNumber('')
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

  const notificationData = {
    message: errorMessage,
    setMessage: setErrorMessage,
    isError: isError,
    setIsError: setIsError
  }

  const personHook = () => {
    personService
      .getAll()
      .then(initialNotes => {
        setPersons(initialNotes)
      })
  }

  // Initialization
  useEffect(personHook, [])

  // Tag logic
  const ListPersons = filterTerm === '' ?
    <Persons persons={persons} setPersons={setPersons} showNotification={showNotification} />
    : <Persons persons={filterPersons} setPersons={setPersons} showNotification={showNotification} />

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notificationData} />
      <Filter value={filterTerm} onChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} data={addPersonData} />
      <h2>Numbers</h2>
      {ListPersons}
    </div>
  );
};

export default App;
import React from 'react'
import personService from '../services/person'

const Persons = ({ persons, setPersons, showNotification }) => {
  const handleDelete = (selectedPerson) => {
    const isConfirmed = window.confirm(`Delete ${selectedPerson.name}?`)
    if (isConfirmed) {
      personService
        .remove(selectedPerson.id)
        .then(() => {
          setPersons(persons.filter(person => person !== selectedPerson))
          showNotification(`${selectedPerson.name} has been deleted.`, false)
        })
        .catch((err) => showNotification(`${selectedPerson.name} was already removed from server.`, true))
    }
  }

  return (
    <div>
      {persons.map((person) => (
        <li key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></li>
      ))}
    </div>
  );
};

export default Persons
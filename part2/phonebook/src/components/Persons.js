import React from 'react'
import personService from '../services/person'
    
const Persons = ({ persons, setPersons }) => {
    const handleDelete = (selectedPerson) => {
        const isConfirmed = window.confirm(`Delete ${selectedPerson.name}?`)
        if (isConfirmed) {
            personService
                .remove(selectedPerson.id)
                .then( () => {
                   setPersons(persons.filter(person => person !== selectedPerson))
                   //window.alert(`${selectedPerson.name} has been deleted.`)
                })
                .catch((err) => window.alert(`${selectedPerson.name} does not exist anymore.`))
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
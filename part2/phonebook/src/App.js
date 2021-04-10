import React, { useState } from "react";

const Debug = ({ label, value }) => {
  return (
    <div>
      DEBUG: {label}={value}
    </div>
  );
};

const ListPeople = ({ people }) => {
  return (
    <div>
      {people.map((person) => (
        <li key={person.name}>{person.name} {person.number}</li>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ListPeople people={persons} />
    </div>
  );
};

export default App;

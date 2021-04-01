import React, { useState } from 'react'

const Debug = ({label, value}) => {
  return (
    <div>DEBUG: {label}={value}</div>
  )
}

const ListPeople = ({people}) => {
  return (
    <div>
      {people.map(person => 
        <li key={person.id}>{person.name}</li>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ListPeople people={persons} />
    </div>
  )
}

export default App